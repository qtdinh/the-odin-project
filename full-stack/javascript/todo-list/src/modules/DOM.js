import * as App from "../index.js";

const addProjectButton = document.getElementById("add-project");
const addTaskButton = document.getElementById("new-task");
const taskForm = document.getElementById("task");
const projectForm = document.getElementById("project");
const projects = document.getElementById("projects");
const tasksContainer = document.querySelector(".list-container ol");
const detailsModal = document.getElementById("details");
const taskModal = document.getElementById("task-editor");
const projectModal = document.getElementById("project-editor");
const closeButtonTask = document.querySelector(".close-task-modal");
const closeButtonProject = document.querySelector(".close-project-modal");
const tasksButton = document.getElementById("tasks");
const listElements = document.querySelector("#sidebar li");

closeButtonTask.addEventListener("click", (event) => {
  event.preventDefault();
  taskModal.classList.remove("open");
});

closeButtonProject.addEventListener("click", (event) => {
  event.preventDefault();
  projectModal.classList.remove("open");
});

addProjectButton.addEventListener("click", () => {
  openModal(projectModal);
});

addTaskButton.addEventListener("click", () => {
  openModal(taskModal);
});

taskForm.addEventListener("submit", (event) => {
  App.addNewTask();
  event.preventDefault();
  closeModal(taskModal);
  taskForm.reset();
});

projectForm.addEventListener("submit", (event) => {
  App.addNewProject();
  event.preventDefault();
  closeModal(projectModal);
  projectForm.reset();
});

listElements.addEventListener("click", (event) => {
  const selectedItem = document.querySelector(".selected");

  if (selectedItem) {
    selectedItem.classList.remove("selected");
  }
  event.currentTarget.classList.add("selected");
});

tasksButton.addEventListener("click", () => {
  tasksContainer.innerHTML = "";
  App.myProjects.forEach((project) => {
    project.getTasks().forEach((task) => {
      const projectTask = document.createElement("li");
      // label with the name of the task
      projectTask.innerText = task.name;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute(
        "class",
        "w-6 h-6 text-gray-800 remove-task dark:text-white",
      );
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("fill", "none");
      svg.setAttribute("viewBox", "0 0 24 24");

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("stroke", "currentColor");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("stroke-width", "2");
      path.setAttribute(
        "d",
        "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z",
      );

      svg.appendChild(path);
      projectTask.appendChild(svg);
      const removeTask = projectTask.querySelector(".remove-task");

      removeTask.addEventListener("click", (event) => {
        event.stopPropagation();

        project.removeTask(task.name);
        projectTask.remove();
      });

      projectTask.addEventListener("click", () => {
        createDetailsModal(project.name, task);
        openModal(detailsModal);
      });
      //append into the container
      tasksContainer.appendChild(projectTask);
    });
  });
});

window.addEventListener("load", () => {
  App.loadDataFromLocalStorage();
  refreshProjectsUI();
});

export function refreshProjectsUI() {
  // Store the ID of the currently selected project, if any
  const selectedProjectId = document
    .querySelector(".selected")
    ?.getAttribute("project-id");

  // Clear existing project elements
  projects.innerHTML = "";

  // Create and append project elements for each project in myProjects
  App.myProjects.forEach((project, index) => {
    const projectElement = createProjectElement(project, index);
    projects.appendChild(projectElement);

    // Reapply selected state if this project was previously selected
    if (index.toString() === selectedProjectId) {
      projectElement.classList.add("selected");
    }
  });
}

export function createProjectElement(project, index) {
  const wrapper = document.createElement("div");
  const minusSpan = document.createElement("span");

  wrapper.classList.add("project-wrapper");

  minusSpan.innerText = "-";
  minusSpan.setAttribute("id", "remove-project");

  minusSpan.addEventListener("click", () => {
    App.removeProject(index);
    tasksContainer.innerHTML = "";
  });

  const newProjectElement = document.createElement("li");
  newProjectElement.innerText = project.name;
  newProjectElement.setAttribute("project-id", index);

  newProjectElement.addEventListener("click", (event) => {
    const selectedItem = document.querySelector(".selected");

    if (selectedItem) {
      selectedItem.classList.remove("selected");
    }
    event.currentTarget.classList.add("selected");
    displayTasks(project);
  });

  wrapper.appendChild(newProjectElement);
  wrapper.appendChild(minusSpan);

  return wrapper;
}

export function createDetailsModal(projectName, task) {
  const taskName = document.createElement("h2");
  const exitButton = document.createElement("button");
  const modalInner = document.querySelector(".details-inner");

  exitButton.innerText = "×";
  exitButton.classList.add("close-modal");

  modalInner.innerHTML = "";
  taskName.innerText = `${task.name}`;

  modalInner.appendChild(exitButton);
  modalInner.appendChild(taskName);

  exitButton.addEventListener("click", () => {
    closeModal(detailsModal);
  });

  const newParagraph = document.createElement("p");
  newParagraph.setAttribute("id", `${projectName}`);
  newParagraph.innerHTML = `<strong>Project: </strong> ${projectName}`;
  modalInner.appendChild(newParagraph);

  const taskEntries = Object.entries(task);

  for (let i = 1; i < taskEntries.length; i++) {
    const [prop, value] = taskEntries[i];
    const propName = App.formatPropertyName(prop);
    const valueName = App.formatPropertyName(value);
    const newParagraph = document.createElement("p");
    newParagraph.setAttribute("id", `${propName}`);
    newParagraph.innerHTML = `<strong>${propName}: </strong> ${valueName}`;
    modalInner.appendChild(newParagraph);
  }
}

export function displayTasks(project) {
  //reset the container
  tasksContainer.innerHTML = "";
  project.getTasks().forEach((task) => {
    //for each task, do what?
    // create a li element
    const projectTask = document.createElement("li");
    // label with the name of the task
    projectTask.innerText = task.name;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute(
      "class",
      "w-6 h-6 text-gray-800 remove-task dark:text-white",
    );
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute(
      "d",
      "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z",
    );

    svg.appendChild(path);
    projectTask.appendChild(svg);
    const removeTask = projectTask.querySelector(".remove-task");

    removeTask.addEventListener("click", (event) => {
      event.stopPropagation();

      project.removeTask(task.name);
      projectTask.remove();
      App.updateLocalStorage();
    });

    projectTask.addEventListener("click", () => {
      createDetailsModal(project.name, task);
      openModal(detailsModal);
    });
    //append into the container
    tasksContainer.appendChild(projectTask);
  });
}

export function getTaskInput() {
  const name = document.getElementById("task-name").value;
  const description = document.getElementById("task-desc").value;
  const date = document.getElementById("due-date").value;
  const priority = document.querySelector(
    "input[name='priority']:checked",
  ).value;
  const selectedElement = document.querySelector(".selected");
  const form = document.getElementsByName("task")[0];

  if (!selectedElement) {
    alert("Please select a project first before adding tasks.");
    return;
  }

  return { name, description, date, priority, selectedElement, form };
}

function closeModal(modal) {
  modal.classList.remove("open");
}

function openModal(modal) {
  modal.classList.add("open");
}

export function getProjectName() {
  return document.querySelector("#project-name").value;
}
