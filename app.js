// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const clear = document.querySelector(".clear-storage");

// event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", modify);
filterOption.addEventListener("change", filterTodo);
clear.addEventListener("click", clearLocalStorage);

// functions
// append a new todo when todo-button is clicked
function addTodo(event) {
  event.preventDefault(); // prevent button from submitting and refreshing

  // make all elements
  // make todo div containing the li and two buttons
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-div");
  // make todo li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-li");
  todoDiv.appendChild(newTodo);

  // add todo to local storage
  addLocalTodo(todoInput.value, false);

  // make todo check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("todo-check-button");
  todoDiv.appendChild(checkButton);
  // make todo trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("todo-trash-button");
  todoDiv.appendChild(trashButton);

  // append the todo-div to the parent ul, todoList
  todoList.appendChild(todoDiv);

  // clearn input value
  todoInput.value = "";
}

function modify(e) {
  const item = e.target;
  const todo = item.parentElement;
  // trash button functionality
  if (item.classList[0] === "todo-trash-button") {
    // start transition
    todo.classList.add("fall"); // .fall has css transition properties, which allow us to listen when transition ends
    removeLocalTodo(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check button functionality
  if (item.classList[0] === "todo-check-button") {
    todo.classList.toggle("completed");
    updateLocalTodoStatus(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        // checking if modify() toggled 'completed' for the todo div
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        // checking if modify() didn't toggle 'completed' for the todo div
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function addLocalTodo(input, completed) {
  // check for rewriting
  const todo = {
    name: input,
    status: completed,
  };
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // push todo
  todos.push(todo);
  // update local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoText = todo.children[0].innerText;
  const todoIndex = todos.findIndex((todo) => todo.name === todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateLocalTodoStatus(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoText = todo.children[0].innerText;
  const todoIndex = todos.findIndex((todo) => todo.name === todoText);
  todos[todoIndex].status = todo.classList.contains("completed") === true;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // make all elements
    // make todo div containing the li and two buttons
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");
    // make todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo.name;
    newTodo.classList.add("todo-li");
    todoDiv.appendChild(newTodo);
    // make todo check button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add("todo-check-button");
    todoDiv.appendChild(checkButton);
    // make todo trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("todo-trash-button");
    todoDiv.appendChild(trashButton);

    // add status decoration
    if (todo.status === true) {
      todoDiv.classList.add("completed");
    }

    // append the todo-div to the parent ul, todoList
    todoList.appendChild(todoDiv);
  });
}

function clearLocalStorage() {
  const todos = [];
  localStorage.setItem("todos", JSON.stringify(todos));
}
