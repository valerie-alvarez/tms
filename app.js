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

    taskList_temp.forEach((task,index) => {
        const newli = document.createElement('li');
        newli.classList.add('taskTitle');

        const ourhtml = `
         <div class="header" onclick ="showDetails('${task.name}','${task.details.Details}','${task.details.Priority}','${task.details.Deadline}',${index})"> ${task.name}
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

    let name1 = document.getElementById("name1");
    let details1 = document.getElementById("details1");
    let priority1 = document.getElementById("priority1");
    let deadline1 = document.getElementById("deadline1");

    name1.disabled = true;
    details1.disabled = true;
    priority1.disabled = true;
    deadline1.disabled = true;
}

function showDetails(name,Details,Priority,Deadline,index){
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

    const finished = document.getElementById('finishTask');
    finished.onclick = function () {
        finishedTask(index);
    };

    const taskList1 = [];

    function finishedTask(index) {

        taskList.splice(index, 1);

        localStorage.setItem('taskList', JSON.stringify(taskList));

        listview.innerHTML = '';
        taskList.forEach((task, newIndex) => {
            const newli = document.createElement('li');
            newli.classList.add('taskTitle');

            const ourhtml = `
            <div class="header" onclick ="showDetails('${task.name}','${task.details.Details}','${task.details.Priority}','${task.details.Deadline}',${newIndex})"> ${task.name}
            </div>`;
            
            newli.innerHTML = ourhtml;
            listview.appendChild(newli);
        });


        closeCreator();
                    
        let nombre1 = name1.value;
        const Task1 = {
            name: nombre1,
            /** priority: document.getElementsByName("priority").value,
                deadline: document.getElementsByName("deadline").value,
                finished: "False"*/
        }
    
        taskList1.push(Task1)
    
        const taskList_string1 = JSON.stringify(taskList1);
        localStorage.setItem('taskList1', taskList_string1);
    
        const taskList_temp1 = JSON.parse(localStorage.getItem('taskList1'));
        console.log("tarea recuperada: ", taskList_temp1);
    
        taskList_temp1.forEach((task,index) => {
            const newli = document.createElement('li');
            newli.classList.add('finishedTask');
    
            const ourhtml = `
             <div class="header" > ${task.name}
            </div>`;
            
            newli.innerHTML = ourhtml;
            doneList.appendChild(newli);
            closeCreator();
    
        });
    }

    const edit = document.getElementById('editInputs');
    edit.onclick = function () {
        editInputs(index);
    };

    function editInputs(index){
        let name1 = document.getElementById("name1").value;
        let details1 = document.getElementById("details1").value;
        let priority1 = document.getElementById("priority1").value;
        let deadline1 = document.getElementById("deadline1").value;
    
        taskList[index] = {
            name: name1,
            details: {
                Details: details1,
                Priority: priority1,
                Deadline: deadline1
            }
        };
    
        localStorage.setItem('taskList', JSON.stringify(taskList));
    
        listview.innerHTML = '';
        taskList.forEach((task, newIndex) => {
            const newli = document.createElement('li');
            newli.classList.add('taskTitle');
    
            const ourhtml = `
             <div class="header" onclick ="showDetails('${task.name}','${task.details.Details}','${task.details.Priority}','${task.details.Deadline}',${newIndex})"> ${task.name}
            </div>`;
            
            newli.innerHTML = ourhtml;
            listview.appendChild(newli);
        });
    
        closeCreator();
    }   

}
    
function editTask(){
    let name1 = document.getElementById("name1");
    let details1 = document.getElementById("details1");
    let priority1 = document.getElementById("priority1");
    let deadline1 = document.getElementById("deadline1");

    name1.disabled = false;
    details1.disabled = false;
    priority1.disabled = false;
    deadline1.disabled = false;
}

