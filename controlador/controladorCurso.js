const Respuesta = require("../modelo/DTO/Respuesta");
const CursosDAO = require("../modelo/CursosDAO");

let ObtenerListaDeCursos =async (pregunta , respuesta)=>{
    //let {profesor, curso} = pregunta.body;
    let cur =new CursosDAO()
    let cursos = await cur.obtenerCursos(); 
    if(cursos==false){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        respuesta.json(new Respuesta(200,false,true,cursos,"OK"));
    }
}

module.exports={ObtenerListaDeCursos}