const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const getRecetas = async () => {

    try {

        let recetas = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARRECETA(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllRecetas = {};

            getAllRecetas['Id'] = row[i++].toString();
            getAllRecetas['Descripcion'] = row[i++];
            getAllRecetas['IdProducto'] = row[i++].toString();
            getAllRecetas['NombreProducto'] = row[i++];

            recetas.push(getAllRecetas);
        }

        await resultSet.close();
        connection.release();

        return recetas;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de recetas');

    }

}

module.exports = {
    getRecetas
}