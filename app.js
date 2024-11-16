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
    };  const Task = {
        name: nombre,
        details: details
    }; taskList.push(Task);
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
    let nameShow = document.getElementById("nameShow");
    let detailsShow = document.getElementById("detailsShow");
    let priorityShow = document.getElementById("priorityShow");
    let deadlineShow = document.getElementById("deadlineShow");
    nameShow.disabled = true;
    detailsShow.disabled = true;
    priorityShow.disabled = true;
    deadlineShow.disabled = true;
}

/**Toggle para ver menu de detalles de tarea */
function showDetails(name,Details,Priority,Deadline,index){
    document.getElementById("seeTask").style.display="flex";
    document.getElementById("createTask").style.display="none";

    let nameShow = document.getElementById("nameShow"); 
    let detailsShow = document.getElementById("detailsShow");
    let priorityShow = document.getElementById("priorityShow");
    let deadlineShow = document.getElementById("deadlineShow");

    nameShow.value =`${name}`
    detailsShow.value =`${Details}`
    priorityShow.value =`${Priority}`
    deadlineShow.value =`${Deadline}`

    /**Marcar tarea como finalizada */
    const finished = document.getElementById('finishTask');
    finished.onclick = function () {
        finishedTask(index);
    };
    const finishedList = [];
    /**Aquí define función para marcar la tarea como finalizada*/
    function finishedTask(index) {
        /**eliminar tarea completada de array todo  */
        taskList.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        listview.innerHTML = '';
        /**imprimir todo actualizada */
        printList(taskList, listview);
        const isEmpty = JSON.parse(localStorage.getItem('taskList'));
        /**si no hay tareas, mostrar "u have no tasks" */
        if (!isEmpty || isEmpty.length == 0) {
            const newli = document.createElement('li');
            newli.classList.add('taskTitle');
            const ourhtml = `
            <div class="header">you have no tasks</div>`;
            newli.innerHTML = ourhtml;
            listview.appendChild(newli);
        };
        closeCreator(); 
        /**guardar tarea completada en array de terminadas */         
        let nombre1 = nameShow.value;
        const Task1 = {
            name: nombre1,
        }
        finishedList.push(Task1)
        const finishedList_string = JSON.stringify(finishedList);
        localStorage.setItem('finishedList', finishedList_string);
        const finishedList_temp = JSON.parse(localStorage.getItem('finishedList'));
        console.log("finalizadas: ", finishedList_temp);
        closeCreator();
        /**print de tareas terminadas */
        finishedList_temp.forEach((task,index) => {
            const newli = document.createElement('li');
            newli.classList.add('finishedTask');
            const ourhtml = `
             <div class="header" > ${task.name}
            </div>`;
            newli.innerHTML = ourhtml;
            doneList.appendChild(newli);
        })};
        const edit = document.getElementById('editInputs');
        edit.onclick = function () {
        editInputs(index)};
/**Almacena modificacion de tarea */
    function editInputs(index){
        let nameShow = document.getElementById("nameShow").value;
        let detailsShow = document.getElementById("detailsShow").value;
        let priorityShow = document.getElementById("priorityShow").value;
        let deadlineShow = document.getElementById("deadlineShow").value;
        taskList[index] = {
            name: nameShow,
            details: {
                Details: detailsShow,
                Priority: priorityShow,
                Deadline: deadlineShow
            } };
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
    }};
    
    /**Toggle boton editar, abre form para modificar los inputs */
function editTask(){
    document.getElementById("editInputs").style.display="flex"; 
    let nameShow = document.getElementById("nameShow");
    let detailsShow = document.getElementById("detailsShow");
    let priorityShow = document.getElementById("priorityShow");
    let deadlineShow = document.getElementById("deadlineShow");

    nameShow.disabled = false;
    detailsShow.disabled = false;
    priorityShow.disabled = false;
    deadlineShow.disabled = false;
}

