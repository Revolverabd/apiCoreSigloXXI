const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const getPagos = async () => {

    try {

        let pagos = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARPPAGOS(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllPagos = {};

            getAllPagos['Id'] = row[i++].toString();
            getAllPagos['Fecha'] = row[i++].toString();
            getAllPagos['NombreCliente'] = row[i++];
            getAllPagos['NombreEmpleado'] = row[i++];
            getAllPagos['Total'] = row[i++].toString();

            pagos.push(getAllPagos);
        }

        await resultSet.close();
        connection.release();

        return pagos;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de pagos');

    }

}

const savetransactdb = async (pago) => {

    console.log(pago)

    try {
        const { fecha, emailCliente, idEmpleado, total, numMesa } = pago;

        sql = `CALL SP_CREARPAGO(:fecha, :emailCliente, :idEmpleado, :total, :numMesa)`;

        await runQuery(sql, [fecha, emailCliente, idEmpleado, total, numMesa], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación del pago');
    }
}

const finalTableDb = async (numMesa) => {

    try {
        sql = `BEGIN SP_FINALTABLE(:numMesa); END;`
        await runQuery(sql, [numMesa], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la eliminación');

    }
}

module.exports = {
    savetransactdb,
    getPagos,
    finalTableDb
}