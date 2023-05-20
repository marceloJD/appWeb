const { getConnection, query } = require('./coneccion/Coneccion.js');

class CursosDAO{
    constructor(){}
    
    async obtenerCursos(){
        let connection;
        let result =false;
        try {
            connection = await getConnection();           
            
            const selectQuery = `
            SELECT * FROM Curso;
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
            return false;
        }

        return result;
    }
}

module.exports = CursosDAO