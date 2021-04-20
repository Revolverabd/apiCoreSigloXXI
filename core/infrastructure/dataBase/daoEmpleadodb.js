const oracledb = require('oracledb');

const { runQuery } = require('./connection/useConnection');

const { openConnection } = require('../../config/dbCnnConfig');

const saveEmpleadodb = async (empleado) => {

    try {

        const {
            rut,
            nombre,
            apellidoMaterno,
            apellidoPaterno,
            correo,
            telefono,
            contrasenia,
            estadoEmpleado,
            rol
        } = empleado;

        sql = `CALL SP_CREAREMPLEADO
        (
            :rut,
            :nombre,
            :apellidoMaterno,
            :apellidoPaterno,
            :correo,
            :telefono,
            :contrasenia,
            :estadoEmpleado,
            :rol
            )`;

        await runQuery(sql,
            [
                rut,
                nombre,
                apellidoMaterno,
                apellidoPaterno,
                correo,
                telefono,
                contrasenia,
                estadoEmpleado,
                rol
            ], true);
            
        return true;

    } catch (error) {

        throw new Error(error);

    }

}

const getCorreoEmpleado = async (correo) => {

    sql = `BEGIN SP_CORREOEMPLEADO(:correo, :resultCorreo); END;`

    const result = await runQuery
        (sql,
            {
                correo: { dir: oracledb.BIND_IN, type: oracledb.STRING, val: correo },
                resultCorreo: { dir: oracledb.BIND_OUT, type: oracledb.STRING },
            },
            false
        );

    const correoDb = result.outBinds;
    return correoDb;
}

module.exports = {
    saveEmpleadodb,
    getCorreoEmpleado
}

