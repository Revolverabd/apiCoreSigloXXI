const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const getpedidos = async () => {

    try {

        let pedidos = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARPEDIDO(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllPedidos = {};

            getAllPedidos['id'] = row[i++];
            getAllPedidos['numMesa'] = row[i++];
            getAllPedidos['pedidoMesa'] = row[i++];
            getAllPedidos['total'] = row[i++];
            getAllPedidos['estado'] = row[i++];
            getAllPedidos['estadoCocina'] = row[i++];
            getAllPedidos['nombreEmpleado'] = row[i++];
            pedidos.push(getAllPedidos);
        }

        await resultSet.close();
        connection.release();

        return pedidos;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de pedidos');

    }

}

const getpedidosAll = async () => {

    try {

        let pedidos = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARPEDIDOSMESAS(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllPedidos = {};

            getAllPedidos['id'] = row[i++];
            getAllPedidos['numMesa'] = row[i++];
            getAllPedidos['pedidoMesa'] = row[i++];
            getAllPedidos['total'] = row[i++];
            getAllPedidos['estado'] = row[i++];
            getAllPedidos['estadoCocina'] = row[i++];
            getAllPedidos['nombreEmpleado'] = row[i++];

            pedidos.push(getAllPedidos);
        }

        await resultSet.close();
        connection.release();

        return pedidos;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de pedidos');

    }

}

const getpedidoMesa = async (numMesa) => {

    try {

        let pedidos = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARPEDIDOBYMESA(:numMesa, :cursor); END;`,
            {
                numMesa: { type: oracledb.NUBER, dir: oracledb.BIND_IN, val: numMesa},
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllPedidos = {};

            getAllPedidos['id'] = row[i++];
            getAllPedidos['numMesa'] = row[i++];
            getAllPedidos['pedidoMesa'] = row[i++];
            getAllPedidos['total'] = row[i++];
            getAllPedidos['estado'] = row[i++];
            getAllPedidos['estadoCocina'] = row[i++];
            getAllPedidos['idEmpleado'] = row[i++];
            getAllPedidos['nombreEmpleado'] = row[i++];

            pedidos.push(getAllPedidos);
        }

        await resultSet.close();
        connection.release();

        return pedidos;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de pedidos');

    }
}

const savePedidodb = async (pedido) => {

    try {
        const {
            _id,
            numMesa,
            pedidoMesa,
            total,
            estado,
            estadoCocina

        } = pedido;

        const Id = _id.toString();

        sql = `CALL SP_CREARPEDIDO
        (
            :Id,
            :numMesa,
            :pedidoMesa,
            :total,
            :estado,
            :estadoCocina
            )`;

        await runQuery(sql,
            [
                Id,
                numMesa,
                pedidoMesa,
                total,
                estado,
                estadoCocina
            ], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación del pedido');
    }
}

const establecerPedidodb = async (numMesa) => {

    try {

        sql = `BEGIN SP_ESTABLECEMESA(:numMesa); END;`
        await runQuery(sql, [numMesa], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en establecer');

    }
}

const despacharPedidodb = async (id) => {

    try {

        sql = `BEGIN SP_LIBERARMESA(:id); END;`
        await runQuery(sql, [id], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al despachar');

    }
}


module.exports = {
    savePedidodb,
    getpedidos,
    establecerPedidodb,
    getpedidoMesa,
    getpedidosAll,
    despacharPedidodb
}