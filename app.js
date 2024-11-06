
const taskForm = document.getElementById('taskForm');

const taskList = [];
taskForm.addEventListener('submit', event =>{
    event.preventDefault();
    let nombre = event.target.name.value;
    let description = event.target.description.value;
    
    const Task = {
        nombre: nombre,
        description: description,
    }

    taskList.push(Task)

    const taskList_string = JSON.stringify(taskList);
    localStorage.setItem('taskList', taskList_string);
    taskForm.reset();

    const taskList_temp = JSON.parse(localStorage.getItem('taskList'));
    console.log("tarea recuperada: ", taskList_temp);
    
    const results = document.getElementById('results');

    if(taskList_temp){
      taskList_temp.forEach((task) => {
        results.innerHTML += `
        <div class="taskElement">
        <h3>Task Name: ${ task.nombre }</h3>
        <p>Description: ${ task.description }</p><br>
        </article>
        `
      })
    }
} )


