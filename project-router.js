const PROJECT_ID_KEY = "id"
const ENDPOINT =
  "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"

fetch(ENDPOINT)
  .then((response) => response.json())
  .then(displayData)
  .catch((error) => {
    // to do: handle this
    console.error(error)
  })

function displayData(projectsData) {
  // to do: handle no projectsData...
  // comprobar la reponse?
  // validar que la response tiene la forma adecuada

  const currentProjectId = new URLSearchParams(location.search).get(
    PROJECT_ID_KEY
  )

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
  // to do: handle no currentProjectId... 404 scenario
  // message: "no project ID"

  const projectData = projectsData.find(
    (project) => project.uuid === currentProjectId
  )
  // to do: handle no projectData... 404 scenario
  // message: "no project has ID X"

  // projectArea.innerHTML = getProjectAreaHtml(projectData)

  fillNodesWithData(projectData, {
    time: projectArea.querySelector(".project-details-time"),
    title: projectArea.querySelector("h1"),
    summary: projectArea.querySelector(".project-details-summary"),
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
      link: card.querySelector(".card-body a"),
      title: card.querySelector(".card-body h3"),
      summary: card.querySelector(".card-body p"),
    })
  }
}

function fillNodesWithData(projectData, nodes) {
  const fillImgNode = (imgNode) => {
    imgNode.src = projectData.image
    imgNode.alt = `Image of project ${projectData.name}`
  }

  if (nodes.title) {
    nodes.title.textContent = projectData.name
  }
  if (nodes.summary) {
    nodes.summary.textContent = projectData.description
  }
  if (nodes.description) {
    nodes.description.innerHTML = projectData.content
  }
  if (nodes.link) {
    nodes.link.textContent = "Read more"
    nodes.link.href = `/project.html?${PROJECT_ID_KEY}=${projectData.uuid}`
  }
  if (nodes.time) {
    nodes.time.innerHTML = `Completed on <time datetime="${projectData.completed_on}">${projectData.completed_on}</time>`
  }
  if (nodes.img) {
    fillImgNode(nodes.img)
  }
  if (nodes.mainImg) {
    fillImgNode(nodes.mainImg)
  }
  if (nodes.glowImg) {
    fillImgNode(nodes.glowImg)
  }

  Object.values(nodes).forEach((node) =>
    node.classList.remove(
      "skeleton",
      "skeleton-w-15",
      "skeleton-w-30",
      "skeleton-w-45",
      "skeleton-w-75"
    )
  )
}

function getProjectAreaHtml(projectData) {
  const { name, description, content, image, completed_on } = projectData
  return (
    `<h1>${name}</h1>` +
    `<div class="project-details">` +
    /**/ `<p class="project-details-summary">${description}</p>` +
    /**/ `<p class="project-details-time">Completed on <time>${completed_on}</time></p>` +
    `</div>` +
    `<figure class="project-image">` +
    /**/ `<img class="image-main skeleton" src="${image}">` +
    /**/ `<img class="image-glow" src="${image}">` +
    `</figure>` +
    `<div class="project-description">${content}</div>`
  )
}

function shuffle(array) {
  // Fisher-Yates sorting algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function getRandomProjects(projectsData, currentProjectId) {
  const otherProjectsData = currentProjectId
    ? projectsData
        .slice()
        .filter((project) => project.uuid !== currentProjectId)
    : projectsData.slice()
  return shuffle(otherProjectsData)
}