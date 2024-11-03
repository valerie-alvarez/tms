
const taskForm = document.getElementById('taskForm');

const taskList = [];
taskForm.addEventListener('submit', event =>{
    event.preventDefault();
    let nombre = event.target.name.value;
    let description = event.target.description.value;
    let category = event.target.category.value;
    
    const Task = {
        nombre: event.target.name.value,
        description: event.target.description.value,
        category: event.target.category.value,
        status: "active"
    }
    const Tasklist = [Task]

    taskList.push(Task)
    const taskList_string = JSON.stringify(taskList);
    localStorage.setItem('taskList', taskList_string);
    taskForm.reset();

    const taskList_temp = JSON.parse(localStorage.getItem('taskList'));
    console.log("tarea recuperada: ", taskList_temp);
    
    const results = document.getElementById('results');

    if(taskList_temp){
      taskList_temp.forEach((task, index) => {
        console.log(index, task)
        results.innerHTML += `
        <article class="container">
          <h3>Task Name: ${ task.nombre }</h3>
          <p>Description: ${ task.description }</p>
          <span>Category: ${ task.category }</span><br>
          <span>Status: ${ task.status }</span>
        </article>
        `
      })
    }
} )


