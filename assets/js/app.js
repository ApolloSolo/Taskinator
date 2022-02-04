const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector('#tasks-to-do');

const createtTaskHandler = function(){
    const taskItemEl = document.createElement('li');
    taskItemEl.textContent = "New Task";
    taskItemEl.className = "task-item";
    tasksToDoEl.appendChild(taskItemEl);
}

buttonEl.addEventListener('click', () => {
   
})