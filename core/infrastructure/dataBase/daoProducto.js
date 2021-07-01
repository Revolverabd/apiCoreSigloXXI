const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');


const getProductos = async () => {

    try {

        let productos = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARPRODUCTO(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllProductos = {};

            getAllProductos['Id'] = row[i++].toString();
            getAllProductos['Nombre'] = row[i++];
            getAllProductos['Descripcion'] = row[i++];
            getAllProductos['PrecioNeto'] = row[i++].toString();
            getAllProductos['Estado'] = row[i++].toString();
            getAllProductos['Categoria'] = row[i++];
            getAllProductos['IdImagen'] = row[i++].toString();
            getAllProductos['NombreImagen'] = row[i++].toString();

            productos.push(getAllProductos);
        }

        await resultSet.close();
        connection.release();

        return productos;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de productos');

    }

}

const saveProductodb = async (producto) => {

    const { _id, Nombre, Descripcion, PrecioNeto, IdCategoria } = producto;
    console.log(producto);
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

const updateProductodb = async (producto, id) => {
    try {
        const {
            Nombre,
            Descripcion,
            PrecioNeto,
            Estado,
            IdCategoria } = producto;
        console.log(producto);
        sql = `BEGIN SP_ACTUALIZARPRODUCTO(
            :id,
            :Nombre,
            :Descripcion, 
            :PrecioNeto, 
            :Estado, 
            :IdCategoria
            ); END;`
        await runQuery(sql, [
            id,
            Nombre,
            Descripcion,
            PrecioNeto,
            Estado,
            IdCategoria
        ], true);
    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al actuaizar un producto');

    }

}

const deleteProductodb = async (id) => {

    try {
        sql = `BEGIN SP_ELIMINARPRODUCTO(:id); END;`
        await runQuery(sql, [id], true);
    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la eliminación');
    }
}

/**
 * Metodos de manejo de imagenes asociadas
 */

const saveImgProductdb = async (id, name) => {

    try {
        sql = `CALL SP_CREARIMAGEN(:name,:id)`;
        await runQuery(sql, [name, id], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación de la imagen para el producto');
    }

}

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
    getProductos,
    saveProductodb,
    saveImgProductdb,
    getNomImgProduct,
    updateImgProduct,
    updateProductodb,
    deleteProductodb
}