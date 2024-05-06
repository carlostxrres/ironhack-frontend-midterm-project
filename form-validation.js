const FORM_CONSTANTS = {
  LOCALSTORAGE_KEY: "contact-us-form-data",
}

const form = document.querySelector(".contact-us")
// to do: handle error if this is not instanceof HTMLElement

const previousFormData = localStorage_getForm()
if (previousFormData) {
  handleSuccessUi(previousFormData)
} else {
  form.addEventListener("submit", handleSubmit)
}

function handleSubmit(submitEvent) {
  submitEvent.preventDefault()

  const formData = new FormData(form)
  const isValid = validateForm(formData)
  if (!isValid) return

  formData.append("date", Date.now())
  formData.append("time-spent", submitEvent.timeStamp)

  // to do: send formData somewhere

  localStorage_setForm(formData)
  handleSuccessUi(formData)
}

function validateForm(formData) {
  const validationResults = formConditions.map(
    ({ fieldName, condition, invalidMessage }) => {
      const fieldValue = formData.get(fieldName)
      const meets = condition(fieldValue)
      return { meets, fieldName, invalidMessage }
    }
  )

  const areAllValid = validationResults.every((validation) => validation.meets)
  if (areAllValid) {
    return true
  } else {
    handleInvalidFieldsUi(validationResults)
    return false
  }
}

function handleInvalidFieldsUi(validationResults) {
  const invalidHandledFields = []
  validationResults.forEach((validation) => {
    // If it's already been handled as invalid, skip it
    if (invalidHandledFields.includes(validation.fieldName)) return

    // Get errorMessageNode
    const fieldNode = form.querySelector(`[name=${validation.fieldName}]`)
    // to do: handle error if this is not instanceof HTMLElement
    const labelNode = fieldNode.closest("label")
    // to do: handle error if this is not instanceof HTMLElement
    const errorMessageNode = labelNode.querySelector(".error-message-text")
    // to do: handle error if this is not instanceof HTMLElement

    // Perform UI changes
    const [isValid, classMethod, errorMessage] = validation.meets
      ? [true, "remove", ""]
      : [false, "add", validation.invalidMessage]
    fieldNode.classList[classMethod]("invalid")
    errorMessageNode.textContent = errorMessage

    // Focus on the first invalid field
    if (invalidHandledFields.length < 1) {
      fieldNode.focus()
    }

    // Record invalid field as handled
    if (!isValid) {
      invalidHandledFields.push(validation.fieldName)
    }
  })
}

function handleSuccessUi(formData) {
  const handleFieldMethods = {
    date: getDate,
    "time-spent": getAmountOfTime,
  }

  const formKeys = Array.from(formData.keys())
  const messageDetailsHtml = formKeys
    .map((fieldKey) => {
      const fieldValue = formData.get(fieldKey)
      const displayValue =
        handleFieldMethods[fieldKey]?.(fieldValue) || fieldValue

      return `<dt>${fieldKey}</dt><dd>${displayValue}</dd>`
    })
    .join("")

  // to do: this shouldn't be in a form element, just do it outside and remove the form
  form.innerHTML =
    `<div class="contact-message-success">` +
    /**/ `<h2>Thank you for contacting us!</h2>` +
    /**/ `<p>Please expect a response within the next 24 business hours.</p>` +
    /**/ `<p>You can review the message sent below:</p>` +
    /**/ `<dl class="contact-message-success-details">${messageDetailsHtml}</dl>` +
    /**/ `<p>If you need immediate assistance, please call us at <a href="tel:111 111 111">111 111 111</a>.</p>` +
    /**/ `<div>` +
    /**/ /**/ `<button class="new-form button-primary">Send another message</button>` +
    /**/ `</div>` +
    `</div>`
  const newFormButton = form.querySelector(".new-form")
  newFormButton.addEventListener("click", () => {
    localStorage_deleteForm()
    location.reload()
  })
}

function getDate(rawTimestamp) {
  const timestamp = Number(rawTimestamp)
  if (isNaN(timestamp)) {
    console.error("Invalid date", rawTimestamp)
    return rawTimestamp
  }

  return new Date(timestamp).toLocaleDateString(navigator.language, {
    hour: "numeric",
    minute: "numeric",
  })
}

function getAmountOfTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const getPluralSuffix = (value) => (value === 1 ? "" : "s")
  return minutes < 1
    ? `${seconds} second${getPluralSuffix(seconds)}`
    : hours < 1
    ? `${minutes} minute${getPluralSuffix(minutes)}`
    : `${hours} hour${getPluralSuffix(hours)}`
}

function localStorage_setForm(formData) {
  const formDataObject = Object.fromEntries(formData.entries())
  const formDataString = JSON.stringify(formDataObject)
  localStorage.setItem(FORM_CONSTANTS.LOCALSTORAGE_KEY, formDataString)
}

function localStorage_getForm() {
  const formDataString = localStorage.getItem(FORM_CONSTANTS.LOCALSTORAGE_KEY)
  if (!formDataString) return null

  const formDataObject = JSON.parse(formDataString)

  const formData = new FormData()
  for (const key in formDataObject) {
    formData.append(key, formDataObject[key])
  }

  return formData
}

function localStorage_deleteForm() {
  localStorage.removeItem(FORM_CONSTANTS.LOCALSTORAGE_KEY)
}
