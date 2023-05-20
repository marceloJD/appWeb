const Respuesta = require("../modelo/DTO/Respuesta");
const NotasDAO = require("../modelo/NotasDAO");
const PesosDAO = require("../modelo/PesosDAO");

let ObtenerListaDePesos = async (pregunta , respuesta)=>{   
    let profesor = pregunta.body.profesor;
    let curso = pregunta.body.curso;
    let Pesos = new PesosDAO();
    
    let data = await Pesos.obtenerPesos(curso,profesor);
    if(data){
        console.log(data[0].pesos)
        respuesta.json(new Respuesta(200,false,true,JSON.parse(data[0].pesos),"OK") );
    }else{
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }
}

let ModificarListaDePesos = async (pregunta , respuesta)=>{   
    let profesor = pregunta.body.profesor;
    let curso = pregunta.body.curso;
    let pesos = pregunta.body.pesos;
    let Pesos = new PesosDAO();
    
    let error = await Pesos.modificarListaDePesos(curso,profesor,pesos);

    if(error){
        respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
    }else{
        let Notas  = new NotasDAO()
        error = await Notas.modificarListaDeNotas(curso,profesor,pesos);///
        if(error){
            respuesta.json(new Respuesta(400,true,false,[],"ERROR"));
        }else{
            respuesta.json(new Respuesta(200,false,true,[],"OK"));
        }
        
    }
}

module.exports={ObtenerListaDePesos,ModificarListaDePesos}