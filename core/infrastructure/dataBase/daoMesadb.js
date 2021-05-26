const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const getMesas = async () => {

    try {

        let mesas = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARMESAS(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllMesas = {};

            getAllMesas['Id'] = row[i++].toString();
            getAllMesas['NumeroMesa'] = row[i++].toString();
            getAllMesas['CapacidadMesa'] = row[i++].toString();
            getAllMesas['IdEmpleado'] = row[i++].toString();
            getAllMesas['RutEmpleado'] = row[i++];
            getAllMesas['NombreEmpleado'] = row[i++];
            getAllMesas['ApellidoEmpleado'] = row[i++];
            getAllMesas['EstadoMesa'] = row[i++];

            mesas.push(getAllMesas);
        }

        await resultSet.close();
        connection.release();

        return mesas;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de mesas');

    }

}

const saveMesadb = async (mesa) => {

    try {
        const {
            NumeroMesa,
            CapacidadMesa,
            IdEmpleado,
            IdEstadoMesa
        } = mesa;

        sql = `CALL SP_CREARMESA
        (
            :NumeroMesa,
            :CapacidadMesa,
            :IdEmpleado,
            :IdEstadoMesa
            )`;

        await runQuery(sql, [NumeroMesa, CapacidadMesa, IdEmpleado, IdEstadoMesa], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación de la mesa');
    }

}

const updateMesadb = async (mesa, numMesa) => {

    try {

        const {
            CapacidadMesa,
            IdEmpleado,
            IdEstadoMesa
        } = mesa;

        sql = `BEGIN SP_ACTUALIZARMESA(
                :numMesa, 
                :CapacidadMesa,
                :IdEmpleado,
                :IdEstadoMesa
                    ); END;`

        await runQuery(sql,
            [
                numMesa,
                CapacidadMesa,
                IdEmpleado,
                IdEstadoMesa
            ], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al actuaizar una mesa');
    }

}

module.exports = {
    getMesas,
    saveMesadb,
    updateMesadb
}