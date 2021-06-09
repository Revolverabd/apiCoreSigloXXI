const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

const getClientes = async () => {

    try {

        let clientes = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTARCLIENTE(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {

            let i = 0;

            let getAllClientes = {};

            getAllClientes['Id'] = row[i++].toString();
            getAllClientes['Nombre'] = row[i++];
            getAllClientes['Correo'] = row[i++];
            getAllClientes['Img'] = row[i++];
            getAllClientes['EstadoCliente'] = row[i++].toString();

            clientes.push(getAllClientes);
        }

        await resultSet.close();
        connection.release();

        return clientes;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de clientes');

    }

}

const saveClientedb = async (cliente) => {

    try {
        const {
            _id,
            name,
            email,
            picture
        } = cliente;

        const id = _id.toString();

        sql = `CALL SP_CREARCLIENTE (:id,:name,:email,:picture)`;

        await runQuery(sql, [id, name, email, picture], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la creación del cliente');

    }

}

const softDeleteClientedb = async (correo) => {

    try {

        sql = `BEGIN SP_ELIMINARCLIENTE(:correo); END;`
        await runQuery(sql, [correo], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la eliminación');

    }
}

const softActivateClientedb = async (correo) => {

    try {

        sql = `BEGIN SP_ACTIVARCLIENTE(:correo); END;`
        await runQuery(sql, [correo], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal al activar empleado');

    }
}


/////////////////////////
//ENTRADAS DB VALIDATOR//
/////////////////////////

const getCorreoCliente = async (email) => {

    try {

        sql = `BEGIN SP_GETCORREOSTATECLIENTE(:email, :resultEmail, :resultState); END;`;

        const result = await runQuery
            (sql,
                {
                    email: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: email },
                    resultEmail: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultState: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
                },
                false
            );

        const emailDb = result.outBinds.resultEmail;
        const stateDb = result.outBinds.resultState;

        const resultConsult = {
            emailDb,
            stateDb
        }

        return resultConsult;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal');

    }

}



module.exports = {
    getCorreoCliente,
    saveClientedb,
    getClientes,
    softDeleteClientedb,
    softActivateClientedb
}