// // Define UI variables
const clearBtn = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");
const form = document.querySelector("#task-form");
const filter = document.querySelector("#filter");
const ul = document.querySelector(".collection");

// // Load all event Listerner Here
loadAllEventListner();

// // Add Event listner
function loadAllEventListner() {
  // DOM load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Submit the value
  form.addEventListener("submit", addTask);

  // Delete Item
  ul.addEventListener("click", deleteItem);

  // Clear all the task
  clearBtn.addEventListener("click", clearTask);

  // Filter the task
  filter.addEventListener("keyup", taskFilter);
}

// getTasks Function
function getTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((el) => {
    const li = `
    <li class="collection-item">
    ${el}
        <a href="#" class="delete-item secondary-content">
            <i class="fa fa-remove"></i>
        </a>
    </li>
    `;
    // Add html
    ul.insertAdjacentHTML("afterbegin", li);
  });
}

// ADD Task Function
function addTask(e) {
  // Call create Html function
  if (taskInput.value === "") {
    alert("Add a Task");
  }
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  ul.appendChild(li);

  // Store task in Local Storage call Fuction
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";
  e.preventDefault();
}

// Store task in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// DELETE ITEM
function deleteItem(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Item from local Stroge
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear All the task
function clearTask() {
  if (confirm("Remove All Task???")) {
    // ul.innerHTML = "";

    // Faster Way of Remove child
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    localStorage.clear();
  }
}

// Filter the tasks
function taskFilter(e) {
  const text = e.target.value.toLowerCase();

  const collection = document.querySelectorAll(".collection-item");
  collection.forEach((el) => {
    const item = el.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) !== -1) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
}
