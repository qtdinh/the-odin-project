//Refactor code:
// 1. Separate application and DOM logic
// 2. Make sure modules adhere to the S principle
// 3. Change buttons to submit events

import { Project } from "./modules/Project";
import { Todo } from "./modules/Todo";
import * as DOM from "./modules/DOM";

export const myProjects = [];

export function formatPropertyName(propertyName) {
  return propertyName
    .replace(/([A-Z])/, " $1") // Insert space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

export function addNewProject() {
  //should create a new instance of a project
  //get the name from the input element

  //access input element..
  const projectName = DOM.getProjectName();
  const newProject = new Project(projectName);
  myProjects.push(newProject);
  updateLocalStorage();
  DOM.refreshProjectsUI();
  // form.reset();
}

export function removeProject(index) {
  myProjects.splice(index, 1);
  DOM.refreshProjectsUI();
  updateLocalStorage();
}

export function addNewTask() {
  const { name, description, date, priority, selectedElement, form } =
    DOM.getTaskInput();

  const selectedProject =
    myProjects[selectedElement.getAttribute("project-id")];

  const newTodo = new Todo(name, description, date, priority);

  selectedProject.addTask(newTodo);

  DOM.displayTasks(selectedProject);

  updateLocalStorage();

  form.reset();
}

export function updateLocalStorage() {
  // Load existing data from localStorage
  const storedData = localStorage.getItem("projectKey");
  let data;
  if (storedData) {
    data = JSON.parse(storedData);
  } else {
    data = {
      projects: [],
    };
  }

  data.projects = myProjects.map((project) => ({
    name: project.name,
    tasks: project.tasks,
  }));

  // Save the updated data back to localStorage
  localStorage.setItem("projectKey", JSON.stringify(data));
}

export function loadDataFromLocalStorage() {
  const storedData = localStorage.getItem("projectKey");
  if (storedData) {
    const data = JSON.parse(storedData);
    myProjects.splice(0); // Clear existing projects
    data.projects.forEach((projectData) => {
      const project = new Project(projectData.name);
      projectData.tasks.forEach((taskData) => {
        const task = new Todo(
          taskData.name,
          taskData.description,
          taskData.dueDate,
          taskData.priority,
        );
        project.addTask(task);
      });
      myProjects.push(project);
    });
  }
}
