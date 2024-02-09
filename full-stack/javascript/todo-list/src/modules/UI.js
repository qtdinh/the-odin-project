
export function openProjectDialog() {
    const projectDialog = document.getElementById("project-dialog");
    projectDialog.showModal();
}

export function closeProjectDialog() {
    const projectDialog = document.getElementById("project-dialog");
    projectDialog.close();
}

export function getProjectNameInput() {
    return document.getElementById("project-name").value;
}