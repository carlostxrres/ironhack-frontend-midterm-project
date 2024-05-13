const CURRENT_SECTION_CLASSNAME = "current-page"

const handleIntersection = (intersection) => {
  const sectionId = intersection.target.id
  const currentlyActive = document.querySelector(
    `.nav-bar .${CURRENT_SECTION_CLASSNAME}`
  )
  const shouldBeActive = document.querySelector(
    `.nav-bar [href*="#${sectionId}"]`
  )

  if (currentlyActive instanceof HTMLElement) {
    currentlyActive.classList.remove(CURRENT_SECTION_CLASSNAME)
  }

  if (shouldBeActive instanceof HTMLElement) {
    shouldBeActive.classList.add(CURRENT_SECTION_CLASSNAME)
  }
}
const handleIntersections = (intersections) => {
  const intersecting = intersections.find(intersection => intersection.isIntersecting)
  if (intersecting) {
    handleIntersection(intersecting)
  }
}
const observer = new IntersectionObserver(handleIntersections)
const sections = document.querySelectorAll("#hero, #projects, #services")
sections.forEach((section) => observer.observe(section))
