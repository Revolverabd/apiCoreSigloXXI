const bcryptjs = require('bcryptjs');

const { getIdRol } = require("../core/infrastructure/dataBase/daoRol");

const {
    getCorreoEmpleado,
    getIdEmpleado,
    getCorreoAndStateEmpleado,
    getRutStateEmpleado
} = require("../core/infrastructure/dataBase/daoEmpleadodb");

// validaciones con RUT
const rutExists = async (rut) => {

    const { rutResult } = await getRutStateEmpleado(rut);

    if (rutResult != null) {

        throw new Error(`Empleado con rut: ${rut} ya está registrado`);

    }
}

const rutDoesNotExist = async (rut) => {

    const { rutResult } = await getRutStateEmpleado(rut);

    if (!rutResult) {

        throw new Error(`Empleado con rut: ${rut} no existe`);

    }
}

const rutDoesNotExistDeactivate = async (rut) => {

    const { rutResult, stateResult } = await getRutStateEmpleado(rut);

    if (!rutResult) {
        throw new Error(`Empleado con rut: ${rut} no exite`);
    }

    if (stateResult != 1) {
        throw new Error(`Empleado con rut: ${rut} esta desactivado`);
    }

}

const rutDoesNotExistActivate = async (rut) => {

    const { rutResult, stateResult } = await getRutStateEmpleado(rut);

    if (!rutResult) {
        throw new Error(`Empleado con rut: ${rut} no exite`);
    }

    if (stateResult != 0) {
        throw new Error(`Empleado con rut: ${rut} ya esta activado`);
    }

}

//validaciones con ROL
const roleExists = async (rol) => {

    try {

        const resultRol = await getIdRol(rol);

        if (!resultRol) {

            throw new Error(`Roll con id: ${rol} no existe`);

        }

    } catch (error) {

        console.log(error);

    }

}

//validaciones con CORREO, CONTRASENIA
const correoExists = async (correo) => {

    const correoDb = await getCorreoEmpleado(correo);

    if (correoDb != null) {

        throw new Error(`Correo: ${correo} ya está registrado`);

    }
}

const isValidLogin = async (correo, contrasenia) => {

    const { correoDb, stateDb, contraseniaDb, idDb, RolDb, nombreDb, apePaDb } = await getCorreoAndStateEmpleado(correo);

    if (!contraseniaDb) {
        return false;
    }

    const validContrasenia = bcryptjs.compareSync(contrasenia, contraseniaDb);

    if (!correoDb || !stateDb || stateDb != 1 || !validContrasenia) {
        return false;
    }

    const objDatos = {
        idDb,
        RolDb,
        nombreDb,
        apePaDb
    }

    return objDatos;

}

//validaciones con ID
const idEmpleadoExists = async (id) => {

    const idDb = await getIdEmpleado(id);

    if (!idDb) {

        throw new Error(`Empleado con id: ${id} no esta registrado`);

    }

    return idDb;

}


module.exports = {
    roleExists,
    correoExists,
    idEmpleadoExists,
    isValidLogin,
    rutExists,
    rutDoesNotExist,
    rutDoesNotExistDeactivate,
    rutDoesNotExistActivate,

}

//colocar y probar los try catch