// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", modify);
filterOption.addEventListener("change", filterTodo);

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
  // trash button functionality
  if (item.classList[0] === "todo-trash-button") {
    const todo = item.parentElement;
    // start transition
    todo.classList.add("fall"); // .fall has css transition properties, which allow us to listen when transition ends
    // after the transition ends, the "transionend" event is triggered and will run the associated function
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // check button functionality
  if (item.classList[0] === "todo-check-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
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
