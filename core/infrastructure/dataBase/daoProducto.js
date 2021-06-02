const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const saveProductodb = async (producto) => {
    
    console.log(producto);

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

module.exports = {
    saveProductodb
}