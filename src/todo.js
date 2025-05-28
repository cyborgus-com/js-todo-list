class Todo {

    constructor() {
        this.projects = updateList();
    }

    createProject() {
        const form = document.querySelector(".project-form");
        const submitButton = document.querySelector("#project-submit");

        const projectName = form.elements["name"].value;
        const projectDesc = form.elements["description"].value;
        const projectDue = form.elements["duedate"].value;
        const projectPriority = form.elements["priority"].value;
        
        let project = [
            {
                pid: new Date(now),
                name: projectName,
                description: projectDesc,
                duedate: projectDue,
                priority: projectPriority,
                todos: []
            }
        ]

        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem('projects', JSON.stringify(project));
        })
    }

    createToDo() {

    }

    updateList() {

    }

    deleteProject() {

    }

    deleteToDo() {

    }

}