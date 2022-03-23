// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
document.addEventListener('DOMContentLoaded', getTodos);
// Functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');


    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const completedTodo = document.createElement('button');
    completedTodo.innerHTML = "<i class='fas fa-check'></i>";
    completedTodo.classList.add('todo-completed');
    todoDiv.appendChild(completedTodo);

    const deleteTodo = document.createElement('button');
    deleteTodo.innerHTML = "<i class='fas fa-trash'></i>";
    deleteTodo.classList.add('todo-delete');
    todoDiv.appendChild(deleteTodo);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
};

function deleteCheck(event) {
    const item = event.target;

    if (item.classList[0] === "todo-delete") {
        const todo = item.parentElement;
        deleteLocalTodos(todo);
        todo.remove();
    }
    
    if (item.classList[0] === "todo-completed") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedTodo = document.createElement('button');
        completedTodo.innerHTML = "<i class='fas fa-check'></i>";
        completedTodo.classList.add('todo-completed');
        todoDiv.appendChild(completedTodo);

        const deleteTodo = document.createElement('button');
        deleteTodo.innerHTML = "<i class='fas fa-trash'></i>";
        deleteTodo.classList.add('todo-delete');
        todoDiv.appendChild(deleteTodo);

        todoList.appendChild(todoDiv);
    })
};

function deleteLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};