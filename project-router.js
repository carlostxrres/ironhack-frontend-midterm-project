const SEARCH_KEYS = {
  PROJECT_ID: "id",
  MESSAGE_404: "message",
}
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

  const searchParams = new URLSearchParams(location.search)
  const currentProjectId = searchParams.get(
    SEARCH_KEYS.PROJECT_ID
  )
  const message404 = searchParams.get(
    SEARCH_KEYS.MESSAGE_404
  )
  searchParams.delete(SEARCH_KEYS.MESSAGE_404)
  window.history.replaceState({}, "", `${window.location.pathname}?${searchParams}`);

  const projectArea = document.querySelector("#project")
  if (projectArea instanceof HTMLElement) {
    displayProject(projectsData, currentProjectId, projectArea)
  }

  const otherProjectsArea = document.querySelector("#projects")
  if (otherProjectsArea instanceof HTMLElement) {
    displayOtherProjects(projectsData, currentProjectId, otherProjectsArea)
  }

  // The following are only in page 404
  const randomProjectButton = document.querySelector(".see-random-project")
  if (randomProjectButton instanceof HTMLElement) {
    initializeRandomProjectButton(projectsData, currentProjectId, randomProjectButton)
  }

  const message404Node = document.querySelector(".message-404")
  if (message404Node instanceof HTMLElement) {
    fillNotFoundReasonNode(message404, message404Node)
  }
}

function displayProject(projectsData, currentProjectId, projectArea) {
  if (!currentProjectId) {
    const message404 = "You were trying to see a project without specifying a project ID"
    window.location = `/404.html?${SEARCH_KEYS.MESSAGE_404}=${message404}`
    return
  }

  const projectData = projectsData.find(
    (project) => project.uuid === currentProjectId
  )

  if (!projectData) {
    const message404 = `You were trying to access a project with ID ${currentProjectId}, while there are no projects found with this ID`
    window.location = `/404.html?${SEARCH_KEYS.MESSAGE_404}=${message404}`
    return
  }

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
    nodes.link.href = `/project.html?${SEARCH_KEYS.PROJECT_ID}=${projectData.uuid}`
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
  if (nodes.randomProjectButton) {
    nodes.randomProjectButton.href = `/project.html?${SEARCH_KEYS.PROJECT_ID}=${projectData.uuid}`
    nodes.randomProjectButton.classList.add("link-ready")
  }
  if (nodes.homeButton) {
    nodes.homeButton.innerHTML = "Visit our homepage"
    nodes.homeButton.href = `/`
    nodes.homeButton.classList.add("link-ready")
  }

  Object.values(nodes).forEach(removeSkeletonClasses)
}

function removeSkeletonClasses(node) {
  node.classList.remove(
    "skeleton",
    "skeleton-w-15",
    "skeleton-w-30",
    "skeleton-w-45",
    "skeleton-w-75"
  )
}

function initializeRandomProjectButton(projectsData, currentProjectId, randomProjectButton) {
  if (projectsData.length < 1) {
    fillNodesWithData({}, { homeButton: randomProjectButton })
    return
  }

  const shuffledProjectsData = getRandomProjects(projectsData, currentProjectId)
  fillNodesWithData(shuffledProjectsData[0], { randomProjectButton })
}

function getRandomProjects(projectsData, currentProjectId) {
  const otherProjectsData = currentProjectId
    ? projectsData
      .slice()
      .filter((project) => project.uuid !== currentProjectId)
    : projectsData.slice()
  return shuffle(otherProjectsData)
}

function fillNotFoundReasonNode(message404, message404Node) {
  message404Node.textContent = message404
    ? message404 + "."
    : "The page you are looking for does not exist."
  removeSkeletonClasses(message404Node)
}

function shuffle(array) {
  // Fisher-Yates sorting algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// // Another approach, unused:
// function getProjectAreaHtml(projectData) {
//   const { name, description, content, image, completed_on } = projectData
//   return (
//     `<h1>${name}</h1>` +
//     `<div class="project-details">` +
//     /**/ `<p class="project-details-summary">${description}</p>` +
//     /**/ `<p class="project-details-time">Completed on <time>${completed_on}</time></p>` +
//     `</div>` +
//     `<figure class="project-image">` +
//     /**/ `<img class="image-main skeleton" src="${image}">` +
//     /**/ `<img class="image-glow" src="${image}">` +
//     `</figure>` +
//     `<div class="project-description">${content}</div>`
//   )
// }