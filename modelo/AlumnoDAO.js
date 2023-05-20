const { getConnection, query } = require('./coneccion/Coneccion.js');

class AlumnoDAO{
    constructor(){}
    async ingresarAlumno(nombre , apellidos , dni , correo,direccion){       
        let connection;

        try {
            connection = await getConnection();           
            
            const insertQuery = `INSERT INTO Alumno (Nombre, Apellidos, DNI, correo, direccion) 
            VALUES (?,?,?,?,?)`;
            await query(insertQuery, [nombre , apellidos , dni , correo,direccion]);            

            if (connection) {
            await connection.release();
            }
        } catch (error) {
            console.error(error);
            if (connection) {
            await connection.release();
            }
            return error;
        }

        return false; //// false si noo hubo error , error si lo hubo
    }
   
    async obtenerListaDeAlumnos(curso,profesor){
        let CURSO = false;
        let PROFESOR = false;
        let params = [curso,CURSO,profesor,PROFESOR];
        let selectQuery = `
            SELECT Alumno.*
            FROM Alumno
            INNER JOIN Matricula ON Alumno.CODIGO = Matricula.idAlumno
            INNER JOIN Curso_Profesor ON Matricula.idCursoProfesor = Curso_Profesor.id
            WHERE (Curso_Profesor.idCurso = ? OR ?)
            AND (Curso_Profesor.idProfesor = ? OR ?)
            GROUP BY Alumno.CODIGO;
            `;

        if(curso==0){
            CURSO = true;
        }
        if(profesor==0){
            PROFESOR = true;
        }
        if(curso==0 && profesor==0){
            selectQuery = `
            SELECT *
            FROM Alumno;
            `;
            params=[];
        }
        let connection;
        let resultado=false;
        try {
            connection = await getConnection();                   
            
            resultado = await query(selectQuery, params);
            

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

    async editarListaDeAlumnos(lista){
        let connection ;
        try {
            connection = await getConnection();   
            for (const usuario of lista) {
                const { CODIGO, Nombre, Apellidos, DNI, Correo, Direccion } = usuario;
                //console.log("PRUEBAAA",[Nombre, Apellidos, DNI, Correo, Direccion, CODIGO])
                const q = `UPDATE Alumno SET Nombre = ?, Apellidos = ?, DNI = ?, Correo = ?, Direccion = ? WHERE CODIGO = ?`;
                const params = [Nombre, Apellidos, DNI, Correo, Direccion, CODIGO];
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
        return false; ///TODO BIEN
    }

    async editarAlumno(Nombre, Apellidos, DNI, Correo, Direccion, CODIGO){
        let connection;

        try {
            connection = await getConnection();               
            
            const q = `UPDATE Alumno SET Nombre = ?, Apellidos = ?, Correo = ?, Direccion = ? WHERE DNI = ?`;
            const params = [Nombre, Apellidos,  Correo, Direccion, DNI];
            await query(q, params);
            
        }catch(error){
            console.log(error)
            return error;
        }
        return false;
    }
}
module.exports = AlumnoDAO