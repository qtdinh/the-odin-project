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

    removeTask(taskName) {
        this.tasks = this.tasks.filter(task => task.name !== taskName);
    }

    getTasks() {
        return this.tasks;
    }
}