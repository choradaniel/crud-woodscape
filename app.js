// 1. Utilizar la estructura de objetos DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// 2. Recuperar/obtener datos de localStorage (Read)
let tasks = JSON.parse(window.localStorage.getItem('woodscapeTasks')) || [];

// Función para pintar las tareas en la pantalla
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        li.innerHTML = `
            <span class="task-text">${task}</span>
            <div class="action-btns">
                <button class="edit-btn" onclick="editTask(${index})">EDITAR</button>
                <button class="delete-btn" onclick="deleteTask(${index})">BORRAR</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// 3. Crear / guardar datos dentro localStorage (Create)
addBtn.addEventListener('click', () => {
    const newTask = taskInput.value.trim();
    if (newTask !== '') {
        tasks.push(newTask);
        window.localStorage.setItem('woodscapeTasks', JSON.stringify(tasks));
        taskInput.value = ''; // Limpiar el input
        renderTasks(); // Actualizar la lista visualmente
    } else {
        alert('Por favor, ingresa una tarea.');
    }
});

// 4. Actualizar los datos de localStorage (Update)
window.editTask = function(index) {
    const updatedTask = prompt('Edita la tarea:', tasks[index]);
    if (updatedTask !== null && updatedTask.trim() !== '') {
        tasks[index] = updatedTask.trim();
        window.localStorage.setItem('woodscapeTasks', JSON.stringify(tasks));
        renderTasks();
    }
};

// 5. Borrar los datos de localStorage (Delete)
window.deleteTask = function(index) {
    if (confirm('¿Estás seguro de borrar esta tarea?')) {
        tasks.splice(index, 1);
        window.localStorage.setItem('woodscapeTasks', JSON.stringify(tasks));
        renderTasks();
    }
};

// Cargar las tareas iniciales al abrir la página
renderTasks();