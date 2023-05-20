const formulario = document.getElementById('formulario');
const botonGuardar = document.getElementById("guardar");
const agregar = document.getElementById("agregar");

const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

prevButton.addEventListener('click', () => {
  carousel.scrollLeft -= carousel.offsetWidth;
});

nextButton.addEventListener('click', () => {
  carousel.scrollLeft += carousel.offsetWidth;
});

fetch('./comboCurso.json')
.then(response => response.json())
.then(res => {console.log(res)
var comboBox=document.getElementById("comboBox");
res.map( opcion => {
  var option = document.createElement('option');
  option.value = opcion.id;
  option.textContent = opcion.nombre;
  comboBox.appendChild(option);
});
})

function guardarDatos(){
    console.log("Fetch:",notas)
}
let notas = [{nombre:"nombre" , descripcion:"descripcion" , peso:"10"}]
recargarEstado();
function actualizarVariable(value, n,m){
    notas[n][m]=value;
    console.log(notas)
}
function anadirNota(n){
    notas.splice(n, 0, {nombre:"Nombre" , descripcion:"Descripcion" , peso:"10"});
    console.log(notas)
    recargarEstado();
}

function removerElemento(n){
    notas.splice(n, 1);
    console.log(notas)
    recargarEstado();
}

function recargarEstado(){
    const tbody = document.querySelector('.table');
    tbody.innerHTML=""
    for(let i = 0 ; i<notas.length;i++){
        const row = document.createElement('table');
        row.classList.add("tamaño");
        row.style.position="relative"
        row.innerHTML=`

                <td>

                <input class=" form" name="curso" type="text" value=${notas[i].nombre} oninput="actualizarVariable(this.value,${i},'nombre')"></input>
                </td>
                <td>

                <input class= "form " name="nombre" type="text" value=${notas[i].descripcion} oninput="actualizarVariable(this.value,${i},'descripcion')"></input>
                </td>
                <td>

                <input class=" form" name="peso" type="text" value=${notas[i].peso} oninput="actualizarVariable(this.value,${i},'peso')"></input>

                </td>
                <button class="delete"   onclick="removerElemento(${i})">
                    <i class="fa-solid fa-trash-can"></i> 
                </button>
                <button class="mas" style="position: absolute; top: 50%; left: 100%; transform: translate(-50%, -50%); width:50px "  onclick="anadirNota(${i+1})">
                    +
                </button>

        `;

        tbody.appendChild(row);
    }
}
