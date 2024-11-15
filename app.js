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
         <div class="header" onclick ="showDetails('${task.name}','${task.details.Details}','${task.details.Priority}','${task.details.Deadline}')"> ${task.name}
        </div>`;
        
        newli.innerHTML = ourhtml;
        listview.appendChild(newli);
        closeCreator();

    });
})
        

function openCreator(){
    document.getElementById("createTask").style.display="flex";
    document.getElementById("seeTask").style.display="none";
}

function closeCreator() {
    document.getElementById("createTask").style.display = "none";
    document.getElementById("seeTask").style.display="none";
}

function showDetails(name,Details,Priority,Deadline){
    document.getElementById("seeTask").style.display="flex";
    document.getElementById("createTask").style.display="none";
    
    let name1 = document.getElementById("name1");
    let details1 = document.getElementById("details1");
    let priority1 = document.getElementById("priority1");
    let deadline1 = document.getElementById("deadline1");

    name1.value =`${name}`
    details1.value =`${Details}`
    priority1.value =`${Priority}`
    deadline1.value =`${Deadline}`
}