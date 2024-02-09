import { Todo } from "./Todo";

//class for 'project' that holds todos
export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    getTasks() {
        return this.tasks;
    }
}