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

const saveRecetadb = async (receta) => {

    try {
        const { Descripcion, IdProducto } = receta;

        sql = `CALL SP_CREARRECETA(:Descripcion,:IdProducto)`;

        await runQuery(sql, [Descripcion, IdProducto], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación de la receta');
    }
}

const updateRecetadb = async (receta, id) => {

    try {
        const { Descripcion, IdProducto } = receta;
        sql = `BEGIN SP_ACTUALIZARRECETA(:id,:Descripcion,:IdProducto); END;`
        await runQuery(sql, [id, Descripcion, IdProducto], true);
    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al actuaizar una receta');
    }

}

module.exports = {
    getRecetas,
    saveRecetadb,
    updateRecetadb
}