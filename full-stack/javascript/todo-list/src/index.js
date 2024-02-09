//1. Your ‘todos’ are going to be objects that you’ll want to dynamically create, 
// which means either using factories or constructors/classes to generate them.
// -> Let's use classes

//2. properties a todo item should have
// -> name, description, dueDate, priority
//Additional ideas: notes? checklist to indicate status? category/tags
//3. how to implement projects/todo-lists
import { Project } from './modules/Project';
import { Todo } from './modules/Todo';

const myProjects = [];

const createProjectButton = document.getElementById("new-project");
const addTaskButton = document.getElementById("add-todo");
const projectSubmitButton = document.getElementById("project-submit");
const taskSubmitButton = document.getElementById("todo-submit");
const projects = document.querySelector("#projects");

createProjectButton.addEventListener('click', () => {
    document.getElementById("project-dialog").showModal();
})

addTaskButton.addEventListener('click', () => {
    document.getElementById("todo-dialog").showModal();
})

projectSubmitButton.addEventListener('click', (event) => {
    createNewProject();
})

taskSubmitButton.addEventListener('click', (event) => {
    addNewTask();
})

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


//How would I select a project...
//When adding a todo, display a list of projects
//Have the user check projects with radio buttons for multiple selection
//Will use the addTask property of the specific project

const defaultProject = new Project("Default");
myProjects.push(defaultProject);
const defaultProjectElement = document.createElement("li");
defaultProjectElement.innerText = "Default";
projects.appendChild(defaultProjectElement);

const newTodo = new Todo("Example Todo", "Description", "2024-02-01", "High");
defaultProject.addTask(newTodo);
console.log(myProjects);
// console.log(defaultProject);

//4. Users should be able to create new projects and choose which project their todos go into