const oracledb = require('oracledb');
const { runQuery } = require('./connection/useConnection');
const { openConnection } = require('../../config/dbCnnConfig');

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
            getAllEmpleados['Rol'] = row[i++].toString();

            empleados.push(getAllEmpleados);
        }

        await resultSet.close();
        connection.release();

        return empleados;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal en la carga de empleados');

    }

}

const getEmpleadosCampo = async (campo) => {

    let empleados = [];

    try {

        const connection = await openConnection();

        const result = await connection.execute(
            `BEGIN SP_FILTEREMPLEADO(:campo, :cursor); END;`,
            {
                campo: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: campo },
                cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
            }
        );

        let resultSet = await result.outBinds.cursor;

        if (resultSet) {

            let row;

            while ((row = await resultSet.getRow())) {

                let i = 0;

                let getAllEmpleados = {};

                if (row != '') {

                    getAllEmpleados['Id'] = row[i++].toString();
                    getAllEmpleados['Rut'] = row[i++];
                    getAllEmpleados['Nombre'] = row[i++];
                    getAllEmpleados['ApellidoMaterno'] = row[i++];
                    getAllEmpleados['ApellidoPaterno'] = row[i++];
                    getAllEmpleados['Correo'] = row[i++];
                    getAllEmpleados['Telefono'] = row[i++];
                    getAllEmpleados['EstadoEmpleado'] = row[i++].toString();
                    getAllEmpleados['Rol'] = row[i++].toString();

                    empleados.push(getAllEmpleados);
                }

            }

            await resultSet.close();
            connection.release();

            return empleados;

        } else {

            await resultSet.close();
            connection.release();

            return empleados;
        }

    } catch (error) {
        console.log(error);
        throw new Error('algo salio mal');

    }

}

const saveEmpleadodb = async (empleado) => {

    try {
        const {
            _id,
            Rut,
            Nombre,
            ApellidoMaterno,
            ApellidoPaterno,
            Correo,
            Telefono,
            Contrasenia,
            Rol
        } = empleado;

        const Id = _id.toString();

        sql = `CALL SP_CREAREMPLEADO
        (
            :Id,
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
                Id,
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
        console.log(error);
        throw new Error('Algo salió mal en la creación del empleado');

    }

}

const updateEmpleadodb = async (empleado, rut) => {

    try {

        const {
            Nombre,
            ApellidoMaterno,
            ApellidoPaterno,
            Correo,
            Telefono,
            Contrasenia,
            Rol
        } = empleado;

        sql = `BEGIN SP_ACTUALIZAREMPLEADO(
            :rut,
            :Nombre,
            :ApellidoMaterno,
            :ApellidoPaterno,
            :Correo,
            :Telefono,
            :Contrasenia,
            :Rol
            ); END;`

        await runQuery(sql,
            [
                rut,
                Nombre,
                ApellidoMaterno,
                ApellidoPaterno,
                Correo,
                Telefono,
                Contrasenia,
                Rol
            ], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal al actuaizar un empleado');

    }

}

const softDeleteEmpleadodb = async (rut) => {

    try {

        sql = `BEGIN SP_DESACTIVAREMPLEADO(:rut); END;`
        await runQuery(sql, [rut], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal en la eliminación');

    }
}

const softActivateEmpleadodb = async (rut) => {

    try {

        sql = `BEGIN SP_ACTIVAREMPLEADO(:rut); END;`
        await runQuery(sql, [rut], true);

    } catch (error) {
        console.log(error);
        throw new Error('Algo salio mal al activar empleado');

    }
}

/////////////////////////
//ENTRADAS DB VALIDATOR//
/////////////////////////

const getCorreoEmpleado = async (correo) => {
    try {

        sql = `BEGIN SP_CORREOEMPLEADO(:correo, :resultCorreo); END;`;

        const result = await runQuery(
            sql,
            {
                correo: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: correo },
                resultCorreo: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
            },
            false
        );

        const correoDb = result.outBinds.resultCorreo;
        return correoDb;

    } catch (error) {
        console.log(error)
        throw new Error('Algo salió mal al obtener correo');

    }
}

const getIdEmpleado = async (id) => {

    try {

        sql = `BEGIN SP_GETIDEMPLEADO(:id, :resultEmpleados); END;`;

        const result = await runQuery
            (sql,
                {
                    id: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: id },
                    resultEmpleados: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
                },
                false);
                
        const idDb = result.outBinds.resultEmpleados;
        return idDb;

    } catch (error) {
        console.log(error)
        throw new Error('Algo salió mal al obtener id del empleado');

    }

}

const getCorreoAndStateEmpleado = async (correo) => {

    try {

        sql = `BEGIN SP_GETCORREOSTATEEMPLEADO(:correo, :resultCorreo, :resultState, :resultContrasenia, :resultId, :resultRol, :resultNombre, :resultApePa); END;`;

        const result = await runQuery
            (sql,
                {
                    correo: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: correo },
                    resultCorreo: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultState: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                    resultContrasenia: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultId: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultRol: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                    resultNombre: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultApePa: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                },
                false
            );

        const correoDb = result.outBinds.resultCorreo;
        const stateDb = result.outBinds.resultState;
        const contraseniaDb = result.outBinds.resultContrasenia;
        const idDb = result.outBinds.resultId;
        const RolDb = result.outBinds.resultRol;
        const nombreDb = result.outBinds.resultNombre;
        const apePaDb = result.outBinds.resultApePa;

        const resultConsult = {
            correoDb,
            stateDb,
            contraseniaDb,
            idDb,
            RolDb,
            nombreDb,
            apePaDb
        }

        return resultConsult;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal');

    }

}

const getRutStateEmpleado = async (rut) => {

    try {

        sql = `BEGIN SP_GETRUTESTADOEMPLEADO(:rut, :resultRut, :resultState); END;`;

        const result = await runQuery
            (sql,
                {
                    rut: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: rut },
                    resultRut: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultState: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                },
                false
            );

        const rutResult = result.outBinds.resultRut;
        const stateResult = result.outBinds.resultState;
       
        const rutStateResult = {

            rutResult,
            stateResult

        }

        return rutStateResult;

    } catch (error) {
        console.log(error);
        throw new Error('Algo saliló mal');

    }

}

const getStateEmpleado = async (id) => {
    try {

        sql = `BEGIN SP_GETSTATEEMPLEADO(:id, :resultEmpleados); END;`;

        const result = await runQuery
            (sql,
                {
                    id: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: id },
                    resultEmpleados: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                },
                false
            );
        const stateDb = result.outBinds.resultEmpleados;
        return stateDb;

    } catch (error) {
        console.log(error);
        throw new Error('Lagio salio mal');

    }
}

const getMiddlware = async (id) => {

    try {

        sql = `BEGIN SP_GETMIDDLEWARE(:id, :resultState, :resultId, :resultRol); END;`;

        const result = await runQuery
            (sql,
                {
                    id: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: id },
                    resultState: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                    resultId: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
                    resultRol: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
                },
                false
            );

        const stateDb = result.outBinds.resultState;
        const idDb = result.outBinds.resultId;
        const rolDb = result.outBinds.resultRol;

        const resultConsult = {
            stateDb,
            idDb,
            rolDb,
        }

        return resultConsult;

    } catch (error) {
        console.log(error);
        throw new Error('Algo salió mal');

    }

}


module.exports = {
    getEmpleados,
    getEmpleadosCampo,
    saveEmpleadodb,
    updateEmpleadodb,
    softDeleteEmpleadodb,
    softActivateEmpleadodb,

    getCorreoEmpleado,
    getIdEmpleado,
    getCorreoAndStateEmpleado,
    // getRutEmpleado,
    getRutStateEmpleado,
    getStateEmpleado,
    getMiddlware
}

