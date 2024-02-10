//1. Your ‘todos’ are going to be objects that you’ll want to dynamically create, 
// which means either using factories or constructors/classes to generate them.
// -> Let's use classes

//2. properties a todo item should have
// -> name, description, dueDate, priority
//Additional ideas: notes? checklist to indicate status? category/tags
//3. how to implement projects/todo-lists
import { Project } from './modules/Project';
import { Todo } from './modules/Todo';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const myProjects = [];

const createProjectButton = document.getElementById("new-project");
const addTaskButton = document.getElementById("add-todo");
const projectSubmitButton = document.getElementById("project-submit");
const taskSubmitButton = document.getElementById("todo-submit");
const projects = document.querySelector("#projects");
const tasksContainer = document.querySelector(".list-container ol");
const modal = document.getElementById("details");
const editorModal = document.getElementById("task-editor");
const closeButton = document.querySelector(".close-modal");

closeButton.addEventListener('click', (event) => {
    event.preventDefault();
    editorModal.classList.remove("open");
})

createProjectButton.addEventListener('click', () => {
    editorModal.classList.add("open");
})

// addTaskButton.addEventListener('click', () => {
//     document.getElementById("todo-dialog").showModal();
// })

// projectSubmitButton.addEventListener('click', () => {
//     createNewProject();
// })

// taskSubmitButton.addEventListener('click', () => {
//     addNewTask();
// })


function formatPropertyName(propertyName) {
    return propertyName
        .replace(/([A-Z])/g, ' $1') // Insert space before capital letters
        .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
}


function createNewProject() {
    //should create a new instance of a project
    //get the name from the input element
    
    //access input element..
    const projectName = document.querySelector("#project-name").value;

    if (projectName <= 0) {
        return;
    }

    const newProject = new Project(projectName);
    const newProjectElement = document.createElement("li");
    newProjectElement.innerText = projectName;

    newProjectElement.addEventListener('click', () => {
        const selectedItem = document.querySelector(".selected");

        if (selectedItem) {
            selectedItem.classList.remove("selected");
        }
    
        displayTasks(newProject);
        newProjectElement.classList.add("selected");
    })

    projects.appendChild(newProjectElement);
    //we probably need a list of projects to store
    myProjects.push(newProject);
    console.log(myProjects);
}

function addNewTask() {
    //should create a new instance of a project
    //get the name from the input element
    
    //access input element..
    const taskName = document.querySelector("#todo-name").value;
    const taskDesc = document.querySelector("#todo-desc").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority").value;

    if (taskName.length <= 0) {
        return;
    }

    const newTask = new Todo(taskName, taskDesc, dueDate, priority);
    //we probably need a list of projects to store
    defaultProject.addTask(newTask);
    console.log(defaultProject);
}

function createModal(projectName, task) {
    const taskName = document.createElement("h2");
    const exitButton = document.createElement("button");
    const modalInner = document.querySelector(".details-inner");

    exitButton.innerText = "×";
    exitButton.classList.add("close-modal");

    modalInner.innerHTML = "";
    taskName.innerText = `${task.name}`;

    modalInner.appendChild(exitButton);
    modalInner.appendChild(taskName);

    exitButton.addEventListener('click', () => {
        modal.classList.remove("open");
    })

    const newParagraph = document.createElement("p");
    newParagraph.setAttribute("id", `${projectName}`);
    newParagraph.innerHTML = `<strong>Project: </strong> ${projectName}`
    modalInner.appendChild(newParagraph);

    const taskEntries = Object.entries(task);

    for (let i = 1; i < taskEntries.length; i++) {
        const [prop, value] = taskEntries[i];
        const propName = formatPropertyName(prop);
        const newParagraph = document.createElement("p");
        newParagraph.setAttribute("id", `${propName}`);
        newParagraph.innerHTML = `<strong>${propName}: </strong> ${value}`
        modalInner.appendChild(newParagraph);
    }

}

function displayTasks(project) {
    //reset the container
    tasksContainer.innerHTML = "";;
    project.getTasks().forEach(task => {
        //for each task, do what?
        // create a li element
        const projectTask = document.createElement("li");
        // label with the name of the task
        projectTask.innerText = task.name;
        projectTask.addEventListener('click', () => {
            createModal(project.name, task);
            modal.classList.add("open");
        })
        //append into the container
        tasksContainer.appendChild(projectTask);
    })
}


//How would I select a project...
//When adding a todo, display a list of projects
//Have a button in the sidebar that checks for project chosen

const defaultProject = new Project("Default");
myProjects.push(defaultProject);
const defaultProjectElement = document.createElement("li");
defaultProjectElement.innerText = "Default";

defaultProjectElement.addEventListener('click', () => {
    const selectedItem = document.querySelector(".selected");

    if (selectedItem) {
        selectedItem.classList.remove("selected");
    }
    
    displayTasks(defaultProject);
    defaultProjectElement.classList.add("selected");
})

projects.appendChild(defaultProjectElement);

const newTodo = new Todo("Example Todo", "Description", "2024-02-01", "High");
const oneTodo = new Todo("Example Todo1", "Description", "2024-02-02", "High");
const twoTodo = new Todo("Example Todo2", "Description", "2024-02-03", "High");
const threeTodo = new Todo("Example Todo3", "Description", "2024-02-04", "High");
defaultProject.addTask(newTodo);
defaultProject.addTask(oneTodo);
defaultProject.addTask(twoTodo);
defaultProject.addTask(threeTodo);
console.log(myProjects);
// console.log(defaultProject);

//4. Users should be able to create new projects and choose which project their todos go into