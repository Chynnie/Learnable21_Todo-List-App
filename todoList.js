// new-task
let newTask = document.getElementById("new-task");
// add-button
let addButton = document.getElementById("add-button");
// incomplete-tasks
let incompleteTasks = document.getElementById("incomplete-tasks");
// completed-tasks
let completedTasks = document.getElementById("completed-tasks");
// clear-button
let clearButton = document.getElementById("clear-button");

// Add New Task Function
let addNewTask = function(taskName) {
  // Create List Item
  let taskList = document.createElement("li");
  // input checkbox
  let checkBox = document.createElement("input");
  // label
  let label = document.createElement("label");
  // edit input
  let editInput = document.createElement("input");
  // edit button
  let editButton = document.createElement("button");
  // delete button
  let deleteButton = document.createElement("button");

  // Modifying Each Element
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskName;
  taskList.appendChild(checkBox);
  taskList.appendChild(label);
  taskList.appendChild(editInput);
  taskList.appendChild(editButton);
  taskList.appendChild(deleteButton);

  return taskList;
}

// Add T0-Do
let addTask = function add() {
  if (newTask.value === "") {
    alert("Kindly add a To-Do task!");
    return;
  };

  let taskList = addNewTask(newTask.value);
  incompleteTasks.appendChild(taskList);
  joinTaskEvents(taskList, taskCompleted);
  newTask.value = "";
}

// Edit To-Do
let editTask = function edit() {
  let taskList = this.parentNode;
  let editInput = taskList.querySelector("input[type=text]")
  let label = taskList.querySelector("label");
  let containsClass = taskList.classList.contains("editList");

  // if the taskList element contains the editMode class
  if (containsClass) {
    // Switch from .editList
    // label text becomes the input's value
    label.innerText = editInput.value;
  } else {
    // Switch to .editList
    // input value becomes the labels text
    editInput.value = label.innerText;
  }

  // Toggle .editList class on and off
  taskList.classList.toggle("editList");
}

// Delete Tasks
let deleteTask = function() {
  let taskList = this.parentNode;
  let uList = taskList.parentNode;
  uList.removeChild(taskList);
}

// Mark Task as Completed
let taskCompleted = function complete() {
  // When a task is checked as complete, append the task list item to the #completed-tasks ul
  let taskList = this.parentNode;
  completedTasks.appendChild(taskList);
  joinTaskEvents(taskList, taskIncomplete);
}

// Mark Task as Incomplete
let taskIncomplete = function incomplete() {
  // When a task is unchecked as incomplete, append the task to #incomplete-tasks
  let taskList = this.parentNode;
  incompleteTasks.appendChild(taskList);
  joinTaskEvents(taskList, taskCompleted);
}

addButton.addEventListener("click", addTask);

// Create tasks events for firing edit and delete events, and also moving incomplete tasks to completed tasks
// Join Task Events
let joinTaskEvents = function joinTask(taskListItem, checkBoxEvent) {
  // select list item's children
  let checkBox = taskListItem.querySelector('input[type="checkbox"]');
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");

  // Join edit task to edit button
  editButton.onclick = editTask;
  // Join delete task to delete button
  deleteButton.onclick = deleteTask;
  // Join checkbox event to checkbox
  checkBox.onchange = checkBoxEvent;
}

// Clear all the Tasks
let clear = function() {
  incompleteTasks.innerHTML = "";
  completedTasks.innerHTML = "";
}
clearButton.addEventListener('click', clear);