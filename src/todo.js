class Todo {

    constructor() {
        this.initializeEventHandlers();
        this.populateProjectDropdown();
        this.updateList();
        this.renderProject();
        this.initializeDefaultProject();

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

        let defaultProj = projects.find(project => project.pid == 0);
        this.populateMainArea(defaultProj);
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
        this.renderProject();
        this.populateProjectDropdown();
        form.reset();
    }

    createToDo() {
        const form = document.querySelector('.todo-form');

        // add saved PID value so it's restored for the next PID submission
        const savedPid = form.elements['pid'].value;

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
        this.renderProject();

        let currentProject = JSON.parse(localStorage.getItem('projects')).find(project => project.pid == pid);
        if (currentProject) {
            this.populateMainArea(currentProject);
        }

        form.reset();

        // restore the project selection to the previously selected one
        if (savedPid) {
            form.elements['pid'].value = savedPid;
        }
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
            prDiv.id = project.pid;
            prDiv.innerText = project['name'];
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

    renderProject() {
        let projectDivs = document.querySelectorAll('.sidebar-projects > div');
        let projects = JSON.parse(localStorage.getItem('projects')) || [];

        projectDivs.forEach(div => {
            div.addEventListener('click', () => {
                const pid = Number(div.id);
                const projectItem = projects.find(project => project.pid === pid);
                if (projectItem){
                    console.log(`found project with pid: ${pid}`, projectItem);
                    this.populateMainArea(projectItem);
                } else {
                    console.log(`did NOT find the project with pid: ${pid}`);
                }
            })
        })
    }

    populateMainArea(projectItem) {
        let mainArea = document.querySelector('.rendered');
        mainArea.innerText = '';
        const renderedCrap = document.createElement('div');
        
        // render project name and "todos: " header 
        renderedCrap.innerText = projectItem.name 
        + '; Description: ' 
        + projectItem.description
        + ';\n todos: \n';

        const todoCrap = document.createElement('div');

        (projectItem.todos || []).forEach(todo => {

            const todoContainer = document.createElement('div');
            todoContainer.style.marginBottom = '10px';

            // render innerText, button
            const todoText = document.createElement('span');
            todoText.innerText = `${todo.name}: 
                    ${todo.description}, 
                    Due by: ${todo.duedate}, 
                    Status: ${todo.status}, 
                    Priority: ${todo.priority}`;

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'X';
            deleteButton.onclick = () => this.deleteToDo(projectItem.pid, todo.tid);

            todoContainer.appendChild(deleteButton);
            todoContainer.appendChild(todoText);
            todoCrap.append(todoContainer);
            
        })

        renderedCrap.appendChild(todoCrap);
        mainArea.append(renderedCrap);
    }

    deleteProject() {

    }

    deleteToDo(pid, tid) {
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        const projectItem = projects.find(project => project.pid === pid);

        projectItem.todos = (projectItem.todos || []).filter(todo => todo.tid !== tid);
        localStorage.setItem('projects', JSON.stringify(projects));
        this.renderProject();
        this.populateMainArea(projectItem);
    }

}

const todo = new Todo();