// Recuperar la tabla y el botón
const tabla = document.getElementById("miTabla");
const botonGuardar = document.getElementById("guardar");
const cargarcurso=document.getElementById('cargarcurso');





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







cargarcurso.addEventListener("click",function(){


  fetch('../titulonotas.json')
  .then(response => response.json())
  .then(res => {console.log(res)
    const thead = document.querySelector('#miTabla thead');
    res.map(ti=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <th>${ti.Codigo} </th>
      <th>${ti.Nombre}</th>
      <th>${ti.Apellido}</th>
      <th>${ti.Nota1}</th>
      <th>${ti.Nota2}</th>
      <th>${ti.Nota3}</th>
      <th>${ti.Promedio}</th>
      `;
      thead.appendChild(tr);
    })
   })
    fetch('../notas.json')
    .then(response => response.json())
    .then(res => {console.log(res)

    const tbody = document.querySelector('#miTabla tbody');

    res.map(obj => {
      const tr = document.createElement('tr');
      tr.innerHTML = `

        <td  ><input type="number" value=${obj.Codigo} name="codigo"  disabled></input></td>
        <td > <input 
        disabled
        type="text" 
        value=${obj.Nombre}
        name="nombre" 
        ></input>
        </td>
        <td >
        <input 
        disabled
        type="text" 
        value=${obj.Apellido}
        name="apellido" 
        ></input>
        </td>
        <td >
        <input 
        type="number" 
        value=${obj.Nota1}
        name="nota1" 
        ></input>
        </td>
        <td >
        <input 
        type="number" 
        value=${obj.Nota2}
        name="nota2" 
        ></input>
        <td >
        <input 
        type="number" 
        value=${obj.Nota3}
        name="nota3" 
        ></input>
        </td>
        <td >
        <input 
        type="number" 
        value=${obj.Promedio}
        name="promedio" 
        ></input>
        </td>

      `;
      tbody.appendChild(tr);
    });
})


 guardarDatos()

});
/*
formulario.addEventListener('submit', e => {
  e.preventDefault(); // Previene que se recargue la página al enviar el formulario
  
  const codigo = document.querySelector('#Codigo').value;
  const dni = document.querySelector('#DNI').value;
  const nombre = document.querySelector('#Nombre').value;
  const apellido = document.querySelector('#Apellido').value;
  const correo = document.querySelector('#Correo').value;
  const direccion = document.querySelector('#Direccion').value;
  const nuevaFila = document.createElement('tr');
  nuevaFila.innerHTML = `
  <td  ><input type="number" value=${codigo} name="codigo"  disabled></input></td>
        <td  ><input type="number" value=${dni} name="dni"  disabled></input></td>
        <td > <input 
        type="text" 
        value=${nombre}
        name="nombre" 
        ></input>
        </td>
        <td >
        <input 
        type="text" 
        value=${apellido}
        name="apellido" 
        ></input>
        </td>
        <td >
        <input 
        type="text" 
        value=${correo}
        name="correo" 
        ></input>
        </td>
        <td >
        <input 
        type="text" 
        value=${direccion}" 
        name="direccion" 
        ></input>
        </td>`;
  
  tabla.appendChild(nuevaFila);
  guardarDatos()
  formulario.reset(); // Resetea el formulario para que se pueda agregar otra fila
});
  */

  function guardarDatos() {
  const filas = document.querySelectorAll('#miTabla tbody tr');
  const datos = [];
  filas.forEach(fila => {
    const codigo = fila.querySelector('td:nth-child(1)').textContent;
    const dni = fila.querySelector('td:nth-child(2)').textContent;
    const nombre = fila.querySelector('td:nth-child(3)').textContent;
    const apellido = fila.querySelector('td:nth-child(4)').textContent;
    const correo = fila.querySelector('td:nth-child(5)').textContent;
    const direccion = fila.querySelector('td:nth-child(6)').textContent;
    
    const objeto = {
      codigo,
      dni,
      nombre,
      apellido,
      correo,
      direccion
    };
    
    datos.push(objeto);
  });
  
  localStorage.setItem('datos', JSON.stringify(datos));
} 