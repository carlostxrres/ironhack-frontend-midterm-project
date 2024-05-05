const formConditions = [
  {
    conditionName: "Full name should have at least one character",
    invalidMessage: "Please enter your full name",
    fieldName: "full-name",
    condition: (fieldValue) => fieldValue.trim().length > 0,
  },
  {
    conditionName:
      "Full name should include name and surname separated by a space",
    invalidMessage:
      "Please enter your first name and your surname separated by a space",
    fieldName: "full-name",
    condition: (fieldValue) => fieldValue.includes(" "),
  },
  {
    conditionName: "Email should have at least one character",
    invalidMessage: "Please enter your email address",
    fieldName: "email",
    condition: (fieldValue) => fieldValue.trim().length > 0,
  },
  // The email validation conditions can be improved. For more
  // details, see https://en.wikipedia.org/wiki/Email_address#Syntax
  {
    conditionName:
      "Email should start with a set of letters, numbers, dots, or hyphens",
    invalidMessage: "Please enter a valid email username",
    fieldName: "email",
    condition: (fieldValue) => {
      const emailUsernameRegex = /^[\w-\.]+/
      return emailUsernameRegex.test(fieldValue.trim())
    },
  },
  {
    conditionName: "Email should include a @ symbol",
    invalidMessage: "Please include a @ symbol",
    fieldName: "email",
    condition: (fieldValue) => fieldValue.includes("@"),
  },
  {
    conditionName: "Email should end with a valid domain name",
    invalidMessage: "Please enter a valid email domain",
    fieldName: "email",
    condition: (fieldValue) => {
      const domainRegex = /([\w-]+\.)+[\w-]{2,4}$/
      return domainRegex.test(fieldValue.trim())
    },
  },
  {
    conditionName: "Phone number should have at least one character",
    invalidMessage: "Please enter your phone number",
    fieldName: "phone",
    condition: (fieldValue) => fieldValue.trim().length > 0,
  },
  {
    conditionName:
      "Phone number should include only numbers, spaces, or hyphens. No letters or special characters allowed",
    invalidMessage:
      "Please include only numbers. You may also separate them with spaces or hyphens",
    fieldName: "phone",
    condition: (fieldValue) => {
      const numericPhoneRegex = /^[0-9 -]+$/
      return numericPhoneRegex.test(fieldValue)
    },
  },
  {
    conditionName: "Phone number should be a 9-or-10-digit number",
    invalidMessage: "Please enter just 9 or 10 digits in total",
    fieldName: "phone",
    condition: (fieldValue) => {
      const onlyDigits = fieldValue.replace(/\D/g, "")
      return onlyDigits.length > 8 && onlyDigits.length < 11
    },
  },
  {
    conditionName: "Message should have at least one character",
    invalidMessage: "Please enter a message",
    fieldName: "message",
    condition: (fieldValue) => fieldValue.trim().length > 0,
  },
]
