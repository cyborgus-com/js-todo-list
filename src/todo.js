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

        const listProjectsButton = document.querySelector('#list-my-projects');
        listProjectsButton.addEventListener('click', () => {
            this.updateList();
        })

    }

    createProject() {
        const form = document.querySelector(".project-form");

        const projectName = form.elements["name"].value;
        const projectDesc = form.elements["description"].value;
        const projectDue = form.elements["duedate"].value;
        const projectPriority = form.elements["priority"].value;
        
        if (projectName === '') {
            return;
        }

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
        this.updateList();
        form.reset();
        }

    createToDo() {

    }

    updateList() {
        const sidebar = document.querySelector('.sidebar-projects');
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        sidebar.innerText = '';

        projects.forEach(project => {
            let prDiv = document.createElement('div');
            prDiv.innerText = 'Project: ' + project['name'];
            sidebar.append(prDiv);
        });
    }

    deleteProject() {

    }

    deleteToDo() {

    }

}

const todo = new Todo();