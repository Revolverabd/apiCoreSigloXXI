const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const getInsumos = async () => {

    try {

        let insumos = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARINSUMOS(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllIsumos = {};

            getAllIsumos['Id'] = row[i++].toString();
            getAllIsumos['Nombre'] = row[i++];
            getAllIsumos['PrecioNeto'] = row[i++].toString();
            getAllIsumos['Stock'] = row[i++].toString();
            getAllIsumos['Descripcion'] = row[i++];
            getAllIsumos['Estado'] = row[i++].toString();
            getAllIsumos['IdCategoriaInsumo'] = row[i++].toString();
            getAllIsumos['Categoria'] = row[i++].toString();

            insumos.push(getAllIsumos);
        }

        await resultSet.close();
        connection.release();

        return insumos;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de insumos');

    }

}

const saveInsumodb = async (insumo) => {

    try {
        console.log(insumo)
        const {
            Nombre,
            PrecioNeto,
            Stock,
            Descripcion,
            Estado,
            IdCategoriaInsumo
        } = insumo;

        sql = `CALL SP_CREARINSUMO
        (
            :Nombre,
            :PrecioNeto,
            :Stock,
            :Descripcion,
            :Estado,
            :IdCategoriaInsumo
            )`;

        await runQuery(sql,
            [
                Nombre,
                PrecioNeto,
                Stock,
                Descripcion,
                Estado,
                IdCategoriaInsumo
            ], true);


    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación del insumos');

    }

}

const updateInsumodb = async (insumo, id) => {

    try {

        const {
            Nombre,
            PrecioNeto,
            Stock,
            Descripcion,
            Estado,
            IdCategoriaInsumo
        } = insumo;

        sql = `BEGIN SP_ACTUALIZARINSUMO(
            :id,
            :Nombre,
            :PrecioNeto,
            :Stock,
            :Descripcion,
            :Estado,
            :IdCategoriaInsumo
            ); END;`

        await runQuery(sql,
            [
                id,
                Nombre,
                PrecioNeto,
                Stock,
                Descripcion,
                Estado,
                IdCategoriaInsumo
            ], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al actuaizar un insumo');

    }

}

const softDeleteInsumodb = async (id) => {

    try {

        sql = `BEGIN SP_ELIMINARINSUMO(:id); END;`
        await runQuery(sql, [id], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la eliminación');

    }
}

const softActivateInsumodb = async (id) => {

    try {

        sql = `BEGIN SP_ACTIVARINSUMO(:id); END;`
        await runQuery(sql, [id], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la eliminación');

    }
}

module.exports = {
    getInsumos,
    saveInsumodb,
    updateInsumodb,
    softDeleteInsumodb,
    softActivateInsumodb
}