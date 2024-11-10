const taskForm = document.getElementById('creationForm');
const taskList = [];


taskForm.addEventListener('submit', event => {
    event.preventDefault();
    listview.innerHTML='';
    let nombre = event.target.name.value;
    let details = {"Details" : [event.target.details.value],
                    "Priority" : [event.target.priority.value],
                    "Deadline" : [event.target.deadline.value]};
                   
    const Task = {
        name: nombre,
        details: details
        /** priority: document.getElementsByName("priority").value,
            deadline: document.getElementsByName("deadline").value,
            finished: "False"*/
    }

    taskList.push(Task)

    const taskList_string = JSON.stringify(taskList);
    localStorage.setItem('taskList', taskList_string);
    taskForm.reset();

    const taskList_temp = JSON.parse(localStorage.getItem('taskList'));
    console.log("tarea recuperada: ", taskList_temp);

    taskList_temp.forEach(task => {
        const newli = document.createElement('li');
        newli.classList.add('taskTitle');

        const ourhtml = `
         <div class="header" onclick ="showDetails()"> ${task.name}
        </div>
        <div class="content"> ${task.details}</div>`;
        
        newli.innerHTML = ourhtml;
        listview.appendChild(newli);
        closeCreator();

    });
})
        

function openCreator(){
    document.getElementById("createTask").style.display="flex";
}

function closeCreator() {
    document.getElementById("createTask").style.display = "none";
}