const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const pageContentEl = document.querySelector('#page-content');
const tasksInProgressEl = document.querySelector("#tasks-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");
let taskIdCounter = 0;

let tasks = []

const taskFormHandler = function (event) {
  event.preventDefault();
  const taskNameInput = document.querySelector('input[name="task-name"]').value;
  const taskTypeInput = document.querySelector("select[name='task-type']").value;

  if(!taskNameInput || !taskTypeInput){
    alert('You need to fill out the task form')
    return false;
  }

  formEl.reset()

  const isEdit = formEl.hasAttribute("data-task-id");

  if(isEdit){
    const taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else{
      const taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
      }
      createTaskEl(taskDataObj);
    }
};

const createTaskEl = function (taskDataObj) {
  // create list item
  const listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //set li id
  listItemEl.setAttribute('data-task-id', taskIdCounter);

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

  const taskActionsEl = createTaskActions(taskIdCounter);

  listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  saveTasks();

  taskIdCounter++;
}

const createTaskActions = function(taskId){
  const actionContainerEl = document.createElement('div');
  actionContainerEl.className = "task-actions";

  //Create edit button
  const editButtonEl = document.createElement('button');
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute('data-task-id', taskId);

  actionContainerEl.appendChild(editButtonEl);

  //Create delete button
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  const statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  const statusChoices = ["To Do", "In Progress", "Completed"];

  for(let i = 0; i < statusChoices.length; i++){
    const statusOptionEl = document.createElement('option');
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute('value', statusChoices[i]);

    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

//main content handler

const taskButtonHandler = function(event) {

  if(event.target.matches(".edit-btn")){
    const taskId = event.target.getAttribute('data-task-id');
    editTask(taskId);
  }

  else if(event.target.matches(".delete-btn")){
    const taskId = event.target.getAttribute('data-task-id');
    deletTask(taskId);
  }
}

//Edit task

const editTask = function(taskId) {

  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //get content from task name and type
  const taskName = taskSelected.querySelector("h3.task-name").textContent;
  document.querySelector("input[name='task-name']").value = taskName;

  const taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);
}

const completeEditTask = function(taskName, taskType, taskId){
  // find the matching task list item
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // Find the obj that was edited and update it with new data
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].id === parseInt(taskId)){
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }

  saveTasks();

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

};

//Delete task

const deletTask = function(taskId){
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

   const updatedTaskArray = [];

   for(let i = 0; i < tasks.length; i++){
     if(tasks[i].id !== parseInt(taskId)){
       updatedTaskArray.push(tasks[i]);
     }
   }

   tasks = updatedTaskArray;

   saveTasks();
}

//Change our task catigories

const taskStatusChangeHandler = function(event) {
  const taskId = event.target.getAttribute('data-task-id');

  const statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if(statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].id === parseInt(taskId)){
      tasks[i].status = statusValue;
    }
  }

  saveTasks();
};

//Local Storage

const saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const loadTasks = function(){
  const data = localStorage.getItem("tasks");
  tasks = JSON.parse(data);
  
  if(tasks === null){
    tasks = [];
    return false;
  }
  for(let i = 0; i < tasks.length; i++){
    tasks[i].id = taskIdCounter;
  
    const listItemEl = document.createElement('li');
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", tasks[i].id);
    
    //create div
    const taskInfoEl = document.createElement('div');
    taskInfoEl.className = "taskInfo";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
    listItemEl.append(taskInfoEl);

    const taskActionsEl = createTaskActions(tasks[i].id); //returns action container with edit delete and select. id is used to set thair attribute id values.
    listItemEl.append(taskActionsEl);
    console.log(listItemEl);

    if(tasks[i].status === "to do"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
      tasksToDoEl.appendChild(listItemEl);
    }
    else if(tasks[i].status === "in progress"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
      tasksInProgressEl.appendChild(listItemEl);
    }
    else if(tasks[i].status === "completed"){
      listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
      tasksCompletedEl.appendChild(listItemEl);
    }

    taskIdCounter++;
  }
}

//Event listener

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener('click', taskButtonHandler);

pageContentEl.addEventListener('change', taskStatusChangeHandler);