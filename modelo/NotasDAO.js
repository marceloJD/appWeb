const { getConnection, query } = require('./coneccion/Coneccion.js');

class NotasDAO{
    constructor(){}
    async modificarListaDeNotas(curso, profesor , nuevosPesos ){
        let primerArray =await this.obtenerNotas(curso, profesor);
        if(primerArray){
            for (let i = 0; i < primerArray.length; i++) {
                const notas = primerArray[i].notas;
                const notasFiltradas = notas.filter(nota => {
                  return nuevosPesos.find(notaSegundo => notaSegundo.nombre === nota.nombre);
                });
              
                const notasFaltantes = nuevosPesos.filter(notaSegundo => {
                  return !notas.find(nota => nota.nombre === notaSegundo.nombre);
                });
              
                primerArray[i].notas = [...notasFiltradas, ...notasFaltantes.map(nota => ({ nombre: nota.nombre, calificacion: 0 }))];
            }
            let connection ;
            try {
                connection = await getConnection();   
                for (const usuario of primerArray) {
                    let { id ,notas } = usuario;
                    notas = JSON.stringify(notas);
                    let q = `UPDATE Matricula SET notas = ?
                    WHERE id = ? `;
                    let params = [notas, id];
                    await query(q, params);
                }
                if (connection) {
                    await connection.release();                
                }
            }catch(error){
                console.log(error)
                if (connection) {
                    await connection.release();                
                }
                return error;
            }
        }else{
            return true;
        }
        return false;
    }


    async ingresarListaDeNotas( array){        
        let connection ;
        try {
            connection = await getConnection();   
            for (const nota of array) {
                let { id ,notas } = nota;
                notas = JSON.stringify(notas);
                let q = `UPDATE Matricula SET notas = ?
                WHERE id = ? `;
                let params = [notas, id];
                await query(q, params);
            }
            if (connection) {
                await connection.release();                
            }
        }catch(error){
            console.log(error)
            if (connection) {
                await connection.release();                
            }
            return error;
        }
        return false;
    }
    async obtenerNotas(curso, profesor ){
        let connection;
        let resultado=false;
        try {
            connection = await getConnection();                   
            let selectQuery = `
            SELECT Matricula.id, Alumno.CODIGO, Alumno.Nombre, Alumno.Apellidos, Matricula.notas
            FROM Alumno
            JOIN Matricula ON Alumno.CODIGO = Matricula.idAlumno
            JOIN Curso_Profesor ON Matricula.idCursoProfesor = Curso_Profesor.id
            JOIN Profesor ON Curso_Profesor.idProfesor = Profesor.CODIGO
            WHERE Curso_Profesor.idCurso = ?
            AND Profesor.CODIGO = ?;
            `
            resultado = await query(selectQuery, [curso, profesor]);
            resultado = resultado.map(e=>{
                return {...e , notas : JSON.parse(e.notas)}
            })

            if (connection) {
                await connection.release();                
            }
            
        }catch(error){
            console.error(error);
            if (connection) {
                await connection.release();
            }
        }
        return resultado;
        
        
    }
}

module.exports = NotasDAO