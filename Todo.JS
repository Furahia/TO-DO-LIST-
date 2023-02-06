let title = document.querySelector("#task-title")
let description = document.querySelector("#task-description")
let date = document.querySelector("#task-date")
let updateTodoId = document.querySelector("#updated-todo-id")
let submitNewTodo = document.querySelector("#submit-new-todo")
let Form = document.querySelector("#task-form")

let uncompletedTasks = document.querySelector("#Uncompleted-tasks");
let completedTasks = document.querySelector("#completed-tasks");

let todos = fetchFromStorage(); 

let newTodo = {
    "id": Math.round(Math.random() * 10000), 
    "title": "",
    "description": "",
    "date": "",
    "completed": false
}

title.addEventListener("input", function(event) {
    newTodo.title = event.target.value;
})
description.addEventListener("input", function(event) {
    newTodo.description = event.target.value;
})
date.addEventListener("input", function(event) {
    let today = new Date();
    let dueDate = new Date(event.target.value);

    if(dueDate <= today) {
        alert("Date cannot be in the past")
    } else {
        newTodo.date = event.target.value;
    }
})
submitNewTodo.addEventListener("click", function(event) {
    event.preventDefault();

    todos.push(newTodo);
    saveToStorage(JSON.stringify(todos));

    
    newTodo.id = "";
    newTodo.title = "";
    newTodo.description = "";
    newTodo.date = "";


    location.reload();
})

Form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent default form behaviour
    console.log(Form);
})

function fetchFromStorage() { 
    let storedTodos = JSON.parse(localStorage.getItem("todos"));
    if(storedTodos) {
        return storedTodos;
    } else {
        return [];
    }
}

function saveToStorage(todos) { 
    localStorage.setItem("todos", todos);
}

function displayUncompletedTodos() {
    todos.forEach(function(todo) {
        if( ! todo.completed) { // check if todo.completed is false
            uncompletedTasks.innerHTML += `<li>
            <h5>${todo.title}</h5> 
            <p>${todo.description}</p>
            <button type="button" class="update-todo" data-todo-id="${todo.id}">Update</button>
            <button type="button" class="complete-todo" data-todo-id="${todo.id}">Complete</button>
            <button type="button" class="delete-todo" data-todo-id="${todo.id}">Delete</button>
            </li>`
        }
        
    })
}

function displayCompletedTodos() {
    todos.forEach(function(todo) {
        if(todo.completed) {  // check if the todo has a value completed: true
            completedTasks.innerHTML += `<li>
            <h5>${todo.title}</h5>
            <p>${todo.description}</p>
            <button type="button" class="update-todo" data-todo-id="${todo.id}">Update</button>
            <button type="button" class="complete-todo" data-todo-id="${todo.id}">Uncomplete</button>
            <button type="button" class="delete-todo" data-todo-id="${todo.id}">Delete</button>
            </li>`
        } 
    })
}

// Call these 2 functions to display the todos
displayUncompletedTodos();
displayCompletedTodos();

// Edit todo
let updateTodoButtons = document.querySelectorAll(".update-todo");
updateTodoButtons.forEach(function(updateButton) {
    updateButton.addEventListener("click", function() {

        document.querySelector("#update-todo").classList.remove("hide");

        let todoId = updateButton.getAttribute("data-todo-id");
        todos.forEach(function(todo) {
            if(todo.id == todoId) {
                title.value = todo.title;
                description.value = todo.description;
                date.value = todo.date;
                updateTodoId.value = todo.id;
            }
        })
    })
})

// When update-todo button is clicked
document.querySelector("#update-todo").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the default form submission

    todos.forEach(function(todo) { // loop through all th todos to check each one individually
        if(todo.id == updateTodoId.value) { // check id the current todohas the same id as the id stored in the hidden input
            todo.title = title.value;
            todo.description = description.value;
            todo.date = date.value
        }
    })

    saveToStorage(JSON.stringify(todos));
    document.querySelector("#update-todo").classList.add("hide"); //  re-add thr hide class
    location.reload();
})

// Complete todo
let completeButtons = document.querySelectorAll(".complete-todo");
completeButtons.forEach(function(completeButton) {
    completeButton.addEventListener("click", function() {
        let todoId = completeButton.getAttribute("data-todo-id");
        todos.forEach(function(todo, i) {
            if(todo.id == Number(todoId)) {
                todo.completed = ! todo.completed // Flip the value to it's opposite, if tru make it false and vice versa
            }
        })
        saveToStorage(JSON.stringify(todos));
        // reload page
        location.reload();
    })
})

let deleteTodoButtons = document.querySelectorAll(".delete-todo");

deleteTodoButtons.forEach(function(deleteButton) {
    deleteButton.addEventListener("click", function() {
        let todoId = deleteButton.getAttribute("data-todo-id");
        console.log(todos);
        todos.forEach(function(todo, i) {
            if(todo.id == Number(todoId)) {
                todos.splice(todos.indexOf(i), 1);
            }
        })
        saveToStorage(JSON.stringify(todos));
        // reload page
        location.reload();
    })
})