const inpuTexto = document.getElementById("taskInput");
const btnAgregar = document.getElementById("addBtn");
const tasksSpace = document.querySelector(".task-list");
const btnComplete = document.querySelector(".cmplBtn");


let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas(){
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function renderizarTareas(){
     inpuTexto.value = "";
     tasksSpace.innerHTML = "";

     tareas.forEach(element => {
        tasksSpace.innerHTML += `
            <li class="task-item">
                <span class="task">${element}</span>
                <button class="dltBtn">Delete</button>
                <button class="cmplBtn">Complete</button>
                <button class="edBtn">Edit</button>
            </li>`
     });
     

}


//Agregar Tarea
btnAgregar.addEventListener("click", () => {
  const texto = inpuTexto.value.trim();
  if (texto !== "") {   
    tareas.push(texto);
    guardarTareas();
    renderizarTareas();
  }else{
    alert("No puede agregar una tarea vacia")
  }
});


tasksSpace.addEventListener("click", (e) => {
    //Marca Tarea como completada
  if (e.target.classList.contains("cmplBtn")) {
    const task = e.target.parentElement.querySelector(".task");
    task.style.textDecoration = "line-through";
    
  }

  //Remover Tarea
  if(e.target.classList.contains("dltBtn")){
    e.target.parentElement.remove();
  }
});


window.onload = renderizarTareas();



