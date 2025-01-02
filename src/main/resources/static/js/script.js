// Placeholder for the GET request to list all tasks
fetch('/tasks')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Logic to dynamically render tasks can be added here
    });

// Fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:8080/tasks'); // URL do backend
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Render tasks in the DOM
function renderTasks(tasks) {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''; // Limpa a lista atual

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        listItem.innerHTML = `
            <span class="task-name" style="${task.completed ? 'text-decoration: line-through;' : ''}">${task.name}</span>
            <button class="toggle-btn" onclick="toggleTask(${task.id}, ${task.completed})">${task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
}

async function addTask(taskName) {
    try {
        const response = await fetch('http://localhost:8080/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: taskName, completed: false }),
        });

        if (response.ok) {
            const newTask = await response.json();
            fetchTasks(); // Atualiza a lista de tarefas
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    const taskName = event.target.querySelector('input[name="name"]').value;
    addTask(taskName);
    event.target.reset(); // Limpa o campo
});

async function toggleTask(taskId, currentStatus) {
    try {
        await fetch(`http://localhost:8080/tasks/toggle/${taskId}`, { method: 'POST' });
        fetchTasks(); // Atualiza a lista de tarefas
    } catch (error) {
        console.error('Error toggling task status:', error);
    }
}

async function deleteTask(taskId) {
    try {
        await fetch(`http://localhost:8080/tasks/${taskId}`, { method: 'DELETE' });
        fetchTasks(); // Atualiza a lista de tarefas
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}
