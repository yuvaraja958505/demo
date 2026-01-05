const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Add task
addBtn.addEventListener('click', () => {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({ text: task, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
});

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Toggle task completed
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}
