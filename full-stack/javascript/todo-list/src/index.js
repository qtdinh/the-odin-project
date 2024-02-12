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

const addProjectButton = document.getElementById("add-project");
const addTaskButton = document.getElementById("new-task");
const submitTaskButton = document.getElementById("create-task");
const submitProjectButton = document.getElementById("create-project");
const projects = document.getElementById("projects");
const tasksContainer = document.querySelector(".list-container ol");
const modal = document.getElementById("details");
const editorModal = document.getElementById("task-editor");
const projectModal = document.getElementById("project-editor");
const closeButtonTask = document.querySelector(".close-task-modal");
const closeButtonProject = document.querySelector(".close-project-modal");
const tasksButton = document.getElementById("tasks");
const listElements = document.querySelector("#sidebar li");

closeButtonTask.addEventListener('click', (event) => {
    event.preventDefault();
    editorModal.classList.remove("open");
})

closeButtonProject.addEventListener('click', (event) => {
    event.preventDefault();
    projectModal.classList.remove("open");
})

addProjectButton.addEventListener('click', () => {
    projectModal.classList.add("open");
})

addTaskButton.addEventListener('click', () => {
    editorModal.classList.add("open");
})

submitTaskButton.addEventListener('click', (event) => {
    addNewTask();
    event.preventDefault();
    editorModal.classList.remove("open");
})

submitProjectButton.addEventListener('click', (event) => {
    addNewProject();
    event.preventDefault();
    projectModal.classList.remove("open");
})

listElements.addEventListener('click', (event) => {
    const selectedItem = document.querySelector(".selected");

    if (selectedItem) {
        selectedItem.classList.remove("selected");
    }
    event.currentTarget.classList.add("selected");
})

tasksButton.addEventListener('click', () => {
    tasksContainer.innerHTML = "";
    myProjects.forEach(project => {
        project.getTasks().forEach(task => {

            const projectTask = document.createElement("li");
            // label with the name of the task
            projectTask.innerText = task.name;
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("class", "w-6 h-6 text-gray-800 remove-task dark:text-white");
            svg.setAttribute("aria-hidden", "true");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("fill", "none");
            svg.setAttribute("viewBox", "0 0 24 24");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("stroke", "currentColor");
            path.setAttribute("stroke-linecap", "round");
            path.setAttribute("stroke-linejoin", "round");
            path.setAttribute("stroke-width", "2");
            path.setAttribute("d", "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z");

            svg.appendChild(path);
            projectTask.appendChild(svg);
            const removeTask = projectTask.querySelector(".remove-task");

            removeTask.addEventListener('click', (event) => {
                event.stopPropagation();

                project.removeTask(task.name);
                projectTask.remove();
            })

            projectTask.addEventListener('click', () => {
                createModal(project.name, task);
                modal.classList.add("open");
            })
            //append into the container
            tasksContainer.appendChild(projectTask);
            });
    })
})

window.addEventListener('load', () => {
    loadDataFromLocalStorage();
    refreshProjectsUI();
});

// window.addEventListener("storage", (e) => {
//   document.querySelector(".my-key").textContent = e.key;
//   document.querySelector(".my-old").textContent = e.oldValue;
//   document.querySelector(".my-new").textContent = e.newValue;
//   document.querySelector(".my-url").textContent = e.url;
//   document.querySelector(".my-storage").textContent = JSON.stringify(
//     e.storageArea,
//   );
// });

// projectSubmitButton.addEventListener('click', () => {
//     createNewProject();
// })

// taskSubmitButton.addEventListener('click', () => {
//     addNewTask();
// })


function formatPropertyName(propertyName) {
    return propertyName
        .replace(/([A-Z])/, ' $1') // Insert space before capital letters
        .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
}

function refreshProjectsUI() {
    // Store the ID of the currently selected project, if any
    const selectedProjectId = document.querySelector('.selected')?.getAttribute('project-id');

    // Clear existing project elements
    projects.innerHTML = "";
    
    // Create and append project elements for each project in myProjects
    myProjects.forEach((project, index) => {
        const projectElement = createProjectElement(project, index);
        projects.appendChild(projectElement);

        // Reapply selected state if this project was previously selected
        if (index.toString() === selectedProjectId) {
            projectElement.classList.add('selected');
        }
    });
}

function createProjectElement(project, index) {
    const wrapper = document.createElement("div");
    const minusSpan = document.createElement("span");
    const form = document.getElementsByName("project")[0];

    wrapper.classList.add("project-wrapper");

    minusSpan.innerText = "-";
    minusSpan.setAttribute("id", "remove-project");

    minusSpan.addEventListener('click', () => {
        removeProject(index);
    })

    const newProjectElement = document.createElement("li");
    newProjectElement.innerText = project.name;
    newProjectElement.setAttribute("project-id", index);

    newProjectElement.addEventListener('click', (event) => {
        const selectedItem = document.querySelector(".selected");

        if (selectedItem) {
            selectedItem.classList.remove("selected");
        }
        event.currentTarget.classList.add("selected");
        displayTasks(project);
    })

    wrapper.appendChild(newProjectElement);
    wrapper.appendChild(minusSpan);

    return wrapper;
}


function addNewProject() {
    //should create a new instance of a project
    //get the name from the input element
    
    //access input element..
    const projectName = document.querySelector("#project-name").value;
    const newProject = new Project(projectName);
    myProjects.push(newProject);
    saveDataToLocalStorage();
    refreshProjectsUI();
    // form.reset();
}

function removeProject(index) {
    myProjects.splice(index, 1);
    tasksContainer.innerHTML = "";
    refreshProjectsUI();
    saveDataToLocalStorage();
}

function addNewTask() {
    //should create a new instance of a project
    //get the name from the input element
    
    //access input element values..
    const name = document.getElementById("task-name").value;
    const description = document.getElementById("task-desc").value;
    const date = document.getElementById("due-date").value;
    const priority = document.querySelector("input[name='priority']:checked").value;
    const selectedElement = document.querySelector(".selected");
    const form = document.getElementsByName("task")[0];

    if (!selectedElement) {
        console.log("Abasho");
        alert("Please select a project first before adding tasks.");
        return;
    }

    const selectedProject = myProjects[selectedElement.getAttribute("project-id")];

    const newTodo = new Todo(name, description, date, priority);

    selectedProject.addTask(newTodo);

    displayTasks(selectedProject);

    saveDataToLocalStorage()

    form.reset();
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
        const valueName = formatPropertyName(value);
        const newParagraph = document.createElement("p");
        newParagraph.setAttribute("id", `${propName}`);
        newParagraph.innerHTML = `<strong>${propName}: </strong> ${valueName}`
        modalInner.appendChild(newParagraph);
    }

}

function displayTasks(project) {
    //reset the container
    tasksContainer.innerHTML = "";
    project.getTasks().forEach(task => {
        //for each task, do what?
        // create a li element
        const projectTask = document.createElement("li");
        // label with the name of the task
        projectTask.innerText = task.name;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "w-6 h-6 text-gray-800 remove-task dark:text-white");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 24 24");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("stroke-linejoin", "round");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("d", "M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z");

        svg.appendChild(path);
        projectTask.appendChild(svg);
        const removeTask = projectTask.querySelector(".remove-task");

        removeTask.addEventListener('click', (event) => {
            event.stopPropagation();

            project.removeTask(task.name);
            projectTask.remove();
            saveDataToLocalStorage();
        })

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

function saveDataToLocalStorage() {
    // Load existing data from localStorage
    const storedData = localStorage.getItem('projectKey');
    let data;
    if (storedData) {
        data = JSON.parse(storedData);
    } else {
        data = {
            projects: []
        };
    }

    data.projects = myProjects.map(project => ({
        name: project.name,
        tasks: project.tasks
    }));

    // Save the updated data back to localStorage
    localStorage.setItem('projectKey', JSON.stringify(data));
}


function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('projectKey');
    if (storedData) {
        const data = JSON.parse(storedData);
        myProjects.splice(0); // Clear existing projects
        data.projects.forEach(projectData => {
            const project = new Project(projectData.name);
            projectData.tasks.forEach(taskData => {
                const task = new Todo(taskData.name, taskData.description, taskData.dueDate, taskData.priority);
                project.addTask(task);
            });
            myProjects.push(project);
        });
    }
}

// const defaultProject = new Project("Default");
// const defaultProjectElement = document.createElement("li");
// defaultProjectElement.innerText = "Default";
// //set a ref so that we can access it
// defaultProjectElement.setAttribute("project-id", myProjects.length)
// myProjects.push(defaultProject);

// defaultProjectElement.addEventListener('click', () => {
//     const selectedItem = document.querySelector(".selected");

//     if (selectedItem) {
//         selectedItem.classList.remove("selected");
//     }
    
//     displayTasks(defaultProject);
//     defaultProjectElement.classList.add("selected");
// })

// projects.appendChild(defaultProjectElement);

// const newTodo = new Todo("Example Todo", "Description", "2024-02-01", "High");
// const oneTodo = new Todo("Example Todo1", "Description", "2024-02-02", "High");
// const twoTodo = new Todo("Example Todo2", "Description", "2024-02-03", "High");
// const threeTodo = new Todo("Example Todo3", "Description", "2024-02-04", "High");
// defaultProject.addTask(newTodo);
// defaultProject.addTask(oneTodo);
// defaultProject.addTask(twoTodo);
// defaultProject.addTask(threeTodo);
// console.log(myProjects);

// saveDataToLocalStorage();

// console.log(defaultProject);

//4. Users should be able to create new projects and choose which project their todos go into