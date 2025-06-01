class Todo {

    constructor() {
        this.initializeDefaultProject();
        this.initializeEventHandlers();
        this.populateProjectDropdown();
        this.updateList();
    }

    initializeEventHandlers() {
        const submitButton = document.querySelector("#project-submit");

        submitButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.createProject();
        })

        const todoSubmitButton = document.querySelector('#todo-submit');
        todoSubmitButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.createToDo();
        })
        
        const listProjectsButton = document.querySelector('#list-my-projects');
        listProjectsButton.addEventListener('click', () => {
            this.updateList();
        })

    }

    initializeDefaultProject() {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];

        let checkDefault = projects.some(project => project.pid === 0);

        if (!checkDefault) {

            let defaultProject = {
                pid: 0,
                name: 'Default',
                description: 'Default Project',
                duedate: '',
                priority: '',
                todos: []
                }

            projects.unshift(defaultProject);
            localStorage.setItem('projects', JSON.stringify(projects));
        }
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
        this.populateProjectDropdown();
        form.reset();
    }

    createToDo() {
        const form = document.querySelector('.todo-form');

        const pid = Number(form.elements['pid'].value);
        const todoName = form.elements['todo-name'].value;
        const todoDesc = form.elements['todo-description'].value;
        const todoDueDate = form.elements['todo-duedate'].value;
        const todoStatus = form.elements['todo-status'].value;
        const todoPriority = form.elements['todo-priority'].value;

        if (pid === '' || todoName === '') {
            return;
        }

        let newTodo = {
            tid: Date.now(),
            pid: pid,
            name: todoName,
            description: todoDesc,
            duedate: todoDueDate,
            status: todoStatus,
            priority: todoPriority
        }

        this.addTodo(pid, newTodo);

        this.updateList();
        form.reset();
    }

    addTodo(pid, newTodo) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];

        projects = projects.map(project => 
            project.pid === pid
                ? {...project, todos: [...(project.todos || []), newTodo]}
                : project
        );

        localStorage.setItem('projects', JSON.stringify(projects));
    }

    updateList() {
        const sidebar = document.querySelector('.sidebar-projects');
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        sidebar.innerText = '';
        // ACTION: need to include default project behavior here somehow

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