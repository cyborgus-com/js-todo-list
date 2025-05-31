class Todo {

    constructor() {
        // this.projects = this.updateList();
        this.initializeEventHandlers();
        this.populateProjectDropdown();
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

        let project = {
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
        const form = document.querySelector('todo-form');

        const pid = form.elements['pid'].value;
        const todoName = form.elements['todo-name'].value;
        const todoDesc = form.elements['todo-description'].value;
        const todoDueDate = form.elements['todo-duedate'].value;
        const todoStatus = form.elements['todo-status'].value;
        const todoPriority = form.elements['todo-priority'].value;

        if (pid === '' || todoName === '') {
            return;
        }

        let todo = {
            // CONTINUE HERE
            // FOLLOW PROJECT CREATION
            // WITH THE EXCEPTION OF FINDING PROJECT IN LOCALSTAORAGE BY PID 
            // AND APPENDING TODO ARRAY THERE
        }

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

    populateProjectDropdown() {
        const pid = document.querySelector('#pid')
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        if (projects) {
            pid.innerText = '';
            projects.forEach(project => {
                let input = document.createElement('option');
                input.value = project.pid;
                input.innerText = project.name;
                pid.append(input);
            })
        } else {
            let input = document.createElement('option');
            input.value = 'NA';
            input.innerText = 'No Projects Availabe';
            pid.append(input);
        }
    }

    deleteProject() {

    }

    deleteToDo() {

    }

}

const todo = new Todo();