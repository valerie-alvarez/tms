const taskForm = document.getElementById('creationForm');
const taskList = [];

/**Imprime lista de tareas*/
function printList(List, htmlSpot){

        List.forEach((task,index) => {
        const newli = document.createElement('li');
        newli.classList.add('taskTitle');

        const ourhtml = `
         <div class="header" onclick ="showDetails('${task.name}','${task.details.Details}','${task.details.Priority}','${task.details.Deadline}',${index})"> ${task.name}
        </div>`;
        
        newli.innerHTML = ourhtml;
        htmlSpot.appendChild(newli);

})}

/**Crear tarea nueva*/
taskForm.addEventListener('submit', event => {
    event.preventDefault();
    listview.innerHTML='';
    let nombre = event.target.name.value;
    let details = {"Details" : [event.target.details.value],
                    "Priority" : [event.target.priority.value],
                    "Deadline" : [event.target.deadline.value]
    };     
    const Task = {
        name: nombre,
        details: details
    };

    taskList.push(Task);
    const taskList_string = JSON.stringify(taskList);
    localStorage.setItem('taskList', taskList_string);
    taskForm.reset();

    const taskList_temp = JSON.parse(localStorage.getItem('taskList'));
    console.log("tarea recuperada: ", taskList_temp);

    printList(taskList_temp, listview);
    closeCreator();

    });

        
/**Toggle de ventana de creación de tareas */
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

/**Toggle para ver menu de detalles de tarea */
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

    /**Marcar tarea como finalizada */
    const finished = document.getElementById('finishTask');
    finished.onclick = function () {
        finishedTask(index);
    };
    const finishedList = [];
    /**Aquí define función */
    function finishedTask(index) {

        taskList.splice(index, 1);

        localStorage.setItem('taskList', JSON.stringify(taskList));
        
        listview.innerHTML = '';

        printList(taskList, listview);
        
        const isEmpty = JSON.parse(localStorage.getItem('taskList'));

        if (!isEmpty || isEmpty.length == 0) {
            const newli = document.createElement('li');
            newli.classList.add('taskTitle');
    
            const ourhtml = `
            <div class="header">you have no tasks</div>`;
            
            newli.innerHTML = ourhtml;
            listview.appendChild(newli);
        }

        closeCreator();
                    
        let nombre1 = name1.value;
        const Task1 = {
            name: nombre1,
        }
    
        finishedList.push(Task1)
    
        const finishedList_string = JSON.stringify(finishedList);
        localStorage.setItem('finishedList', finishedList_string);
    
        const finishedList_temp = JSON.parse(localStorage.getItem('finishedList'));
        console.log("finalizadas: ", finishedList_temp);
        
        
        closeCreator();


        finishedList_temp.forEach((task,index) => {
            const newli = document.createElement('li');
            newli.classList.add('finishedTask');
    
            const ourhtml = `
             <div class="header" > ${task.name}
            </div>`;
            
            newli.innerHTML = ourhtml;
            doneList.appendChild(newli);
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
        document.getElementById("editInputs").style.display="none"; 
        closeCreator();
    }   

}
    
function editTask(){
    document.getElementById("editInputs").style.display="block"; 
    let name1 = document.getElementById("name1");
    let details1 = document.getElementById("details1");
    let priority1 = document.getElementById("priority1");
    let deadline1 = document.getElementById("deadline1");

    name1.disabled = false;
    details1.disabled = false;
    priority1.disabled = false;
    deadline1.disabled = false;
}

