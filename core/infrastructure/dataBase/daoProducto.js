const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const saveProductodb = async (producto) => {

    const { _id, Nombre, Descripcion, PrecioNeto, IdCategoria } = producto;

    const Id = _id.toString();

    try {
        sql = `CALL SP_CREARPRODUCTO(:Id,:Nombre,:Descripcion,:PrecioNeto,:IdCategoria)`;

        await runQuery(sql, [Id, Nombre, Descripcion, PrecioNeto, IdCategoria], true);

        return Id;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación del producto');
    }

}

const saveImgProductdb = async (id, name) => {

    try {
        sql = `CALL SP_CREARIMAGEN(:name,:id)`;
        await runQuery(sql, [name, id], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación de la imagen para el producto');
    }

}


/**
 * Metodos de manejo de imagenes asociadas
 */
const updateImgProduct = async (id, name) => {

    try {
        sql = `CALL SP_ACTUALIZANOMBREIMAGEN(:id,:name)`;

        await runQuery(sql, [id, name], true);


    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación del producto');
    }
}

/**
 * Metodos de validacion para manejo de imagenes asociadas
 */
const getNomImgProduct = async (id) => {

    try {
        sql = `BEGIN SP_GETNOMBREIMAGENPORIDPRODUCTO(:id, :resultName, :resultId); END;`;

        const result = await runQuery
            (sql,
                {
                    id: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: id },
                    resultName: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultId: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
                },
                false
            );

        const nameDb = result.outBinds.resultName;
        const idDb = result.outBinds.resultId;

        const data = {
            nameDb,
            idDb
        }

        return data;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal');
    }
}

module.exports = {
    saveProductodb,
    saveImgProductdb,
    getNomImgProduct,
    updateImgProduct
}