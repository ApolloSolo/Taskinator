const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");

const taskFormHandler = function (event) {
  event.preventDefault();

  const taskNameInput = document.querySelector('input[name="task-name"]').value;
  const taskTypeInput = document.querySelector("select[name='task-type']").value;

  //Turn task input and type into an object
  const taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  }

  //Send it as an argument to createTaskEl function
  createTaskEl(taskDataObj);

};

const createTaskEl = function (taskDataObj) {
  // create list item
  const listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // create div to hold task info and add to list item
  const taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";

  listItemEl.appendChild(taskInfoEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
}

//Event listener

formEl.addEventListener("submit", taskFormHandler);