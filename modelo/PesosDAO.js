const { getConnection, query } = require('./coneccion/Coneccion.js');

class PesosDAO{
    constructor(){}
    async definirPesos(curso, profesor , pesos){
        return false;
    }
    async modificarListaDePesos(curso,profesor,pesos){
        let connection;

        try {
            connection = await getConnection();           
            pesos = JSON.stringify(pesos);
            const insertQuery = 
            `UPDATE Curso_Profesor
            SET pesos = ?
            WHERE idProfesor = ? AND idCurso = ?;
            `;
            await query(insertQuery, [pesos , profesor , curso]);            

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
    async obtenerPesos(curso, profesor ){
        console.log("PRUEBA",curso, profesor)
        let connection;
        let result =false;
        try {
            connection = await getConnection();           
            
            const selectQuery = `
            SELECT pesos
            FROM Curso_Profesor
            WHERE idCurso = ? AND idProfesor = ?;
            `;
            result = await query(selectQuery, [curso, profesor]);
            

            if (connection) {
                await connection.release();
                
            }
        } catch (error) {
            console.error(error);
            if (connection) {
                await connection.release();
            }
            return false;
        }

        return result;
    }
}

module.exports = PesosDAO