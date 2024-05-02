getAndDisplayData()

function getAndDisplayData() {
  const ENDPOINT =
    "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"

  fetch(ENDPOINT)
    .then((response) => response.json())
    .then(displayData)
    .catch((error) => {
      // to do: handle this
    })
}

function displayData(projectsData) {
  // to do: handle no projectsData...

  const currentProjectId = new URLSearchParams(location.search).get("id")

  const projectArea = document.querySelector("#project")
  if (projectArea instanceof HTMLElement) {
    displayProject(projectsData, currentProjectId, projectArea)
  }

  const otherProjectsArea = document.querySelector("#projects")
  if (otherProjectsArea instanceof HTMLElement) {
    displayOtherProjects(projectsData, currentProjectId, otherProjectsArea)
  }
}

function displayProject(projectsData, currentProjectId, projectArea) {
  // to do: handle no currentProjectId...

  const projectData = projectsData.find(
    (project) => project.uuid === currentProjectId
  )
  // to do: handle no projectData...

  fillNodesWithData(projectData, {
    title: projectArea.querySelector("h1"),
    summary: projectArea.querySelector(".project-details-summary"),
    time: projectArea.querySelector(".project-details-time time"),
    mainImg: projectArea.querySelector(".image-main"),
    glowImg: projectArea.querySelector(".image-glow"),
    description: projectArea.querySelector(".project-description"),
  })

  document.title = `Circle - ${projectData.name}`
}

function displayOtherProjects(
  projectsData,
  currentProjectId,
  otherProjectsArea
) {
  // to do: handle no currentProjectId...

  const otherProjectsData = getRandomProjects(projectsData, currentProjectId)
  const otherProjectsCards = otherProjectsArea.querySelectorAll(".card")

  for (let i = 0; i < otherProjectsCards.length; i++) {
    const card = otherProjectsCards[i]
    const projectData = otherProjectsData[i]
    if (!projectData) {
      // to do: remove card
      break
    }

    fillNodesWithData(projectData, {
      img: card.querySelector(".card-image img"),
      title: card.querySelector(".card-body h3"),
      summary: card.querySelector(".card-body p"),
      link: card.querySelector(".card-body a"),
    })
  }
}

function fillNodesWithData(projectData, nodes) {
  if (nodes.title) {
    nodes.title.textContent = projectData.name
  }
  if (nodes.summary) {
    nodes.summary.textContent = projectData.description
  }
  if (nodes.time) {
    nodes.time.textContent = projectData.completed_on
    nodes.time.datetime = projectData.completed_on
  }
  if (nodes.mainImg) {
    nodes.mainImg.src = projectData.image
    nodes.mainImg.alt = `Image of project ${projectData.name}`
  }
  if (nodes.glowImg) {
    nodes.glowImg.src = projectData.image
    nodes.glowImg.alt = `Image of project ${projectData.name}`
  }
  if (nodes.description) {
    nodes.description.innerHTML = projectData.content
  }
  if (nodes.img) {
    nodes.img.src = projectData.image
    nodes.img.alt = `Image of project ${projectData.name}`
  }
  if (nodes.link) {
    nodes.link.href = `/project.html?id=${projectData.uuid}`
  }
}

function shuffle(array) {
  // Fisher-Yates Sorting Algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function getRandomProjects(projectsData, currentProjectId) {
  const isAnother = (project) => project.uuid !== currentProjectId
  const otherProjectsData = currentProjectId
    ? projectsData.slice().filter(isAnother)
    : projectsData.slice()
  return shuffle(otherProjectsData)
}
