const inpuTexto = document.getElementById("taskInput");
const btnAgregar = document.getElementById("addBtn");
const allSection = document.querySelector(".all");
const completeSection = document.querySelector(".complete");
const pendSection = document.querySelector(".pend");
const btnComplete = document.querySelector(".cmplBtn");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderizarTareas() {
  inpuTexto.value = "";
  allSection.innerHTML = "";
  completeSection.innerHTML = "";
  pendSection.innerHTML = "";

  for (const t of tareas) {
    
        allSection.innerHTML += `
            <div class="task-item">
                <span class="task">${t.texto}</span>
                <button class="dltBtn">Delete</button>
                <button class="cmplBtn">Complete</button>
                <button class="edBtn">Edit</button>
            </div>`;
      

     if (t.complete === true && t.pendiente === false){
        completeSection.innerHTML += `
            <div class="task-item">
                <span class="task">${t.texto}</span>
                <button class="dltBtn">Delete</button>
            </div>`;
    }

     if (t.complete === false && t.pendiente === true){
        pendSection.innerHTML += `
            <div class="task-item">
                <span class="task">${t.texto}</span>
                <button class="dltBtn">Delete</button>
                <button class="cmplBtn">Complete</button>
                <button class="edBtn">Edit</button>
            </div>`;
    } 
      
  }
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

allSection.addEventListener("click", (e) => {
  //Marca Tarea como completada
  if (e.target.classList.contains("cmplBtn")) {
    const task = e.target.parentElement.querySelector(".task");
    task.style.textDecoration = "line-through";
    let indice = tareas.findIndex(t=> t.texto === task.textContent)
    
    tareas[indice].complete = true;
    tareas[indice].pendiente = false;

    guardarTareas();
    renderizarTareas();
    
  }

  //Remover Tarea
  if (e.target.classList.contains("dltBtn")) {
    let eliminar = e.target.parentElement.querySelector(".task").textContent;
    borrarTareas(eliminar);
  }

  //Editar Tareas
  if (e.target.classList.contains("edBtn")) {
    const task = e.target.parentElement.querySelector(".task").textContent;
    let nuevoTexto = prompt("Introduzca la nueva tarea", task);

    if (nuevoTexto.trim() !== null && nuevoTexto !== "") {
      let index = tareas.findIndex((t) => t.texto === task);
      tareas[index].texto = nuevoTexto;
      guardarTareas();
      renderizarTareas();
    }
  }
});

completeSection.addEventListener("click", (e) => {
  //Marca Tarea como completada
  if (e.target.classList.contains("cmplBtn")) {
    const task = e.target.parentElement.querySelector(".task").textContent;
    task.style.textDecoration = "line-through";
  }

  //Remover Tarea
  if (e.target.classList.contains("dltBtn")) {
    let eliminar = e.target.parentElement.querySelector(".task").textContent;
    borrarTareas(eliminar);
  }

  //Editar Tareas
  if (e.target.classList.contains("edBtn")) {
    const task = e.target.parentElement.querySelector(".task").textContent;
    let nuevoTexto = prompt("Introduzca la nueva tarea", task);

    if (nuevoTexto.trim() !== null && nuevoTexto !== "") {
      let index = tareas.findIndex((t) => t.texto === task);
      tareas[index].texto = nuevoTexto;
      guardarTareas();
      renderizarTareas();
    }
  }
});

pendSection.addEventListener("click", (e) => {
  //Marca Tarea como completada
  if (e.target.classList.contains("cmplBtn")) {
    const task = e.target.parentElement.querySelector(".task");
    task.style.textDecoration = "line-through";
    let indice = tareas.findIndex(t=> t.texto === task.textContent)
    
    tareas[indice].complete = true;
    tareas[indice].pendiente = false;

    guardarTareas();
    renderizarTareas();
    
  }

  //Remover Tarea
  if (e.target.classList.contains("dltBtn")) {
    let eliminar = e.target.parentElement.querySelector(".task").textContent;
    borrarTareas(eliminar);
  }

  //Editar Tareas
  if (e.target.classList.contains("edBtn")) {
    const task = e.target.parentElement.querySelector(".task").textContent;
    let nuevoTexto = prompt("Introduzca la nueva tarea", task);

    if (nuevoTexto.trim() !== null && nuevoTexto !== "") {
      let index = tareas.findIndex((t) => t.texto === task);
      tareas[index].texto = nuevoTexto;
      guardarTareas();
      renderizarTareas();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderizarTareas();
});
