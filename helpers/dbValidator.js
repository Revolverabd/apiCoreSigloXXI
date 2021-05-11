const bcryptjs = require('bcryptjs');

const { getIdRol } = require("../core/infrastructure/dataBase/daoRol");

const {
    getCorreoEmpleado,
    getIdEmpleado,
    getCorreoAndStateEmpleado,
    // getRutEmpleado,
    getRutStateEmpleado,
    // getStateEmpleado
} = require("../core/infrastructure/dataBase/daoEmpleadodb");

// validaciones con RUT
const rutExists = async (rut) => {

    const { rutResult } = await getRutStateEmpleado(rut);

    if (rutResult != null) {

        throw new Error(`Empleado con rut: ${rut} ya está registrado`);

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

    const { correoDb, stateDb, contraseniaDb, idDb } = await getCorreoAndStateEmpleado(correo);

    if (!contraseniaDb) {
        return false;
    }

    const validContrasenia = bcryptjs.compareSync(contrasenia, contraseniaDb);

    if (!correoDb || !stateDb || stateDb != 1 || !validContrasenia) {
        return false;
    }

    return idDb;

}

//validaciones con ID
const idEmpleadoExists = async (id) => {

    const idDb = await getIdEmpleado(id);

    if (!idDb) {

        throw new Error(`Empleado con id: ${id} no esta registrado`);

    }

    return idDb;

}

// const isDeleted = async (id) => {

//     const stateDb = await getStateEmpleado(id);

//     if (stateDb === 0) {

//         throw new Error(`Empleado con id: ${id} eliminado`);

//     }

//     return stateDb;
// }

// const isActivated = async (id) => {

//     const stateDb = await getStateEmpleado(id);

//     if (stateDb === 1) {

//         throw new Error(`Empleado con id: ${id} ya se encuentra activo`);

//     }
// }

module.exports = {
    roleExists,
    correoExists,
    idEmpleadoExists,
    isValidLogin,
    rutExists,
    rutDoesNotExistDeactivate,
    rutDoesNotExistActivate,
    // isDeleted,
    // isActivated
}

//colocar y probar los try catch