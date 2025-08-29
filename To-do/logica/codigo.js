const inpuTexto = document.getElementById("taskInput")
const btnAgregar = document.getElementById("addBtn")

btnAgregar.addEventListener("click",()=>{
    const texto = inpuTexto.value.trim();
    alert(texto)
})