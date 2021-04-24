const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

//obtiene lista de empleados
const getEmpleados = async () => {

    try {

        let empleados = [];

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_LISTAREMPLEADOS(:cursor); END;`,
            {
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;
        let row;

        while ((row = await resultSet.getRow())) {
            let i = 0;
            let getAllEmpleados = {};

            getAllEmpleados['Id'] = row[i++].toString();
            getAllEmpleados['Rut'] = row[i++];
            getAllEmpleados['Nombre'] = row[i++];
            getAllEmpleados['ApellidoMaterno'] = row[i++];
            getAllEmpleados['ApellidoPaterno'] = row[i++];
            getAllEmpleados['Correo'] = row[i++];
            getAllEmpleados['Telefono'] = row[i++];
            getAllEmpleados['EstadoEmpleado'] = row[i++].toString();
            getAllEmpleados['Rol'] = row[i++];

            empleados.push(getAllEmpleados);
        }

        await resultSet.close();
        connection.release();

        console.log(empleados)

        return empleados;

    } catch (error) {

        throw new Error(error);

    }

}

const saveEmpleadodb = async (empleado) => {

    try {

        const {
            Rut,
            Nombre,
            ApellidoMaterno,
            ApellidoPaterno,
            Correo,
            Telefono,
            Contrasenia,
            Rol
        } = empleado;

        sql = `CALL SP_CREAREMPLEADO
        (
            :Rut,
            :Nombre,
            :ApellidoMaterno,
            :ApellidoPaterno,
            :Aorreo,
            :Telefono,
            :Contrasenia,
            :Rol
            )`;

        await runQuery(sql,
            [
                Rut,
                Nombre,
                ApellidoMaterno,
                ApellidoPaterno,
                Correo,
                Telefono,
                Contrasenia,
                Rol
            ], true);


    } catch (error) {

        throw new Error(error);

    }

}

const updateEmpleadodb = async (empleado, id) => {

    try {

        const {
            Nombre,
            ApellidoMaterno,
            ApellidoPaterno,
            Correo,
            Telefono,
            Contrasenia,
            EstadoEmpleado,
            Rol
        } = empleado;

        sql = `BEGIN SP_ACTUALIZAREMPLEADO(
            :id,
            :Nombre,
            :ApellidoMaterno,
            :ApellidoPaterno,
            :Correo,
            :Telefono,
            :Contrasenia,
            :EstadoEmpleado,
            :Rol
            ); END;`

        await runQuery(sql,
            [
                id,
                Nombre,
                ApellidoMaterno,
                ApellidoPaterno,
                Correo,
                Telefono,
                Contrasenia,
                EstadoEmpleado,
                Rol
            ], true);

    } catch (error) {

        throw new Error(error);

    }

}

const softDeleteEmpleadodb = async (id) => {
    
    try {

        sql = `BEGIN SP_DESACTIVAREMPLEADO(:id); END;`
        await runQuery(sql,[id], true);

    } catch (error) {

        throw new Error(error);

    }
}

const softActivateEmpleadodb = async (id) => {
    
    try {

        sql = `BEGIN SP_ACTIVAREMPLEADO(:id); END;`
        await runQuery(sql,[id], true);

    } catch (error) {
        
        throw new Error(error);

    }
}

/////////////////////////
//ENTRADAS DB VALIDATOR//
/////////////////////////

const getCorreoEmpleado = async (correo) => {
    try {

        sql = `BEGIN SP_CORREOEMPLEADO(:correo, :resultCorreo); END;`

        const result = await runQuery(
            sql,
            {
                correo: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: correo },
                resultCorreo: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
            },
            false
        );

        const correoDb = result.outBinds;
        return correoDb;

    } catch (error) {

        throw new Error(error);

    }
}

const getIdEmpleado = async (id) => {

    try {

        sql = `BEGIN SP_GETIDEMPLEADO(:id, :resultEmpleados); END;`

        const result = await runQuery
            (sql,
                {
                    id: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: id },
                    resultEmpleados: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                },
                false
            );

        const resultId = result.outBinds.resultEmpleados;
        return resultId;

    } catch (error) {

        throw new Error(error);

    }

}

module.exports = {
    saveEmpleadodb,
    updateEmpleadodb,
    getEmpleados,
    softDeleteEmpleadodb,
    softActivateEmpleadodb,

    getCorreoEmpleado,
    getIdEmpleado
}

