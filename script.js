const CURRENT_SECTION_CLASSNAME = "current-page"

const config = {
  rootMargin: "-50px 0px -55%",
}

const handleEntry = (entry) => {
  if (!entry.isIntersecting) return

  const id = entry.target.id
  const currentlyActive = document.querySelector(
    `.nav-bar .${CURRENT_SECTION_CLASSNAME}`
  )
  const shouldBeActive = document.querySelector(`[href="/index.html#${id}"]`)

  if (currentlyActive instanceof HTMLElement) {
    currentlyActive.classList.remove(CURRENT_SECTION_CLASSNAME)
  }

  if (shouldBeActive instanceof HTMLElement) {
    shouldBeActive.classList.add(CURRENT_SECTION_CLASSNAME)
  }
}
const handleEntries = (entries) => entries.forEach(handleEntry)
const observer = new IntersectionObserver(handleEntries)
const sections = document.querySelectorAll("#hero, #projects, #services")
sections.forEach((section) => observer.observe(section))
