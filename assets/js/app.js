const formEl = document.querySelector("#task-form");
const tasksToDoEl = document.querySelector('#tasks-to-do');

const createtTaskHandler = function(event){
    event.preventDefault();
    console.log(event);
    const taskItemEl = document.createElement('li');
    taskItemEl.textContent = "New Task";
    taskItemEl.className = "task-item";
    tasksToDoEl.appendChild(taskItemEl);
}

formEl.addEventListener('submit', createtTaskHandler)