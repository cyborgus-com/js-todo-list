class Todo {

    constructor() {
        // this.projects = this.updateList();
        this.initializeEventHandlers();
    }

    initializeEventHandlers() {
        const submitButton = document.querySelector("#project-submit");
        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.createProject();
        })

    }

    createProject() {
        const form = document.querySelector(".project-form");

        const projectName = form.elements["name"].value;
        const projectDesc = form.elements["description"].value;
        const projectDue = form.elements["duedate"].value;
        const projectPriority = form.elements["priority"].value;
        
        let project = 
            {
                pid: Date.now(),
                name: projectName,
                description: projectDesc,
                duedate: projectDue,
                priority: projectPriority,
                todos: []
            }

        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push(project);
        localStorage.setItem('projects', JSON.stringify(projects));
        form.reset();
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

const todo = new Todo();