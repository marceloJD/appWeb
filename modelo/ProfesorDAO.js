const { getConnection, query } = require('./coneccion/Coneccion.js');

class ProfesorDAO{
    constructor(){}
    
    async obtenerProfesores(){
        let connection;
        let result =false;
        try {
            connection = await getConnection();           
            
            const selectQuery = `
            SELECT Nombre,Apellidos,CODIGO FROM Profesor;
            `;
            result = await query(selectQuery, []);
            

            if (connection) {
                await connection.release();
                
            }
        } catch (error) {
            console.error(error);
            if (connection) {
                await connection.release();
            }
        }

        return result;
    }
}

module.exports = ProfesorDAO