const inpuTexto = document.getElementById("taskInput");
const btnAgregar = document.getElementById("addBtn");
const everySection = document.querySelector(".every")
const allSection = document.querySelector(".tasks-content");
const completeSection = document.querySelector(".completadas");
const pendSection = document.querySelector(".pendientes");
const btnComplete = document.querySelector(".cmplBtn");
const contadorTareasAll = document.querySelector(".counterAll");
const contadorTareasComplete = document.querySelector(".counterComplete");
const contadorTareasPendiente = document.querySelector(".counterPendiente");
const btnTodas = document.querySelector(".todas")
const btnCompletadas = document.querySelector(".completa")
const btnpendientes = document.querySelector(".pendiente")


let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function contadorTareas() {
  contadorTareasAll.innerHTML = allSection.childElementCount;
  contadorTareasComplete.innerHTML = completeSection.childElementCount;
  contadorTareasPendiente.innerHTML =  pendSection.childElementCount;
}

function plantillaHtml(work) {
  plantilla = `
            <div class="task-item ${work.complete ? "completado" : ""}">
                <span class="task">${work.texto}</span>
                <div class="task-options">
                <button class="dltBtn">Delete</button>
                <button class="cmplBtn">Complete</button>
                <button class="edBtn">Edit</button>
                </div>
            </div>`;
  return plantilla;
}

function renderizarTareas() {
  inpuTexto.value = "";
  allSection.innerHTML = "";
  completeSection.innerHTML = "";
  pendSection.innerHTML = ""; 

  for (const t of tareas) {
    allSection.innerHTML += plantillaHtml(t);
    
    if(t.complete === true && t.pendiente===false){
      completeSection.innerHTML+= plantillaHtml(t)
    }
    if(t.complete === false && t.pendiente===true){
      pendSection.innerHTML += plantillaHtml(t)
    }
  }

  contadorTareas();
}

function agregarTareas(textoPlano) {
  const texto = textoPlano.trim();
  if (!texto) return;

  const nuevo = {
    texto,
    complete: false,
    pendiente: true,
  };

  tareas.unshift(nuevo);
  guardarTareas();
  renderizarTareas();
}

function borrarTareas(textoPlano) {
  const texto2 = textoPlano.trim();

  tareas = tareas.filter((t) => t.texto !== texto2);
  guardarTareas();
  renderizarTareas();
}

//Agregar Tarea
btnAgregar.addEventListener("click", () => {
  const texto = inpuTexto.value;

  if (texto !== "") {
    agregarTareas(texto);
    guardarTareas();
  } else {
    alert("No puede agregar una tarea vacia");
  }
});

everySection.addEventListener("click", (e) => {
  const item = e.target.closest(".task-item"); // el ítem sobre el que hiciste clic
  if (!item) return;

  const taskEl = item.querySelector(".task");
  const texto = taskEl.textContent;

  // Marcar completada
  if (e.target.classList.contains("cmplBtn")) {
    const i = tareas.findIndex((t) => t.texto === texto);
    if (i !== -1) {
      tareas[i].complete = true;
      tareas[i].pendiente = false;
      guardarTareas();
      renderizarTareas();
      item.classList.add("completado")
    }
  }

  // Borrar
  if (e.target.classList.contains("dltBtn")) {
    borrarTareas(texto);
  }

  // Editar
  if (e.target.classList.contains("edBtn")) {
    const nuevoTexto = prompt("Introduzca la nueva tarea", texto);
    if (nuevoTexto && nuevoTexto.trim() !== "") {
      const i = tareas.findIndex((t) => t.texto === texto);
      if (i !== -1) {
        tareas[i].texto = nuevoTexto.trim();
        guardarTareas();
        renderizarTareas();
      }
    }
  }
});

btnTodas.addEventListener("click", (e)=>{
  completeSection.classList.add("none");
  allSection.classList.remove("none")
  pendSection.classList.add("none")
})

btnCompletadas.addEventListener("click", (e)=>{
  completeSection.classList.remove("none");
  allSection.classList.add("none");
  pendSection.classList.add("none")
})

btnpendientes.addEventListener("click",(e)=>{
  allSection.classList.add("none");
  completeSection.classList.add("none");
   pendSection.classList.remove("none")
})



document.addEventListener("DOMContentLoaded", () => {
  pendSection.classList.add("none");
  completeSection.classList.add("none")
  renderizarTareas();
  
});


