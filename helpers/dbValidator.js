const { getIdRol } = require("../core/infrastructure/dataBase/daoRol");
const { getCorreoEmpleado, getIdEmpleado } = require("../core/infrastructure/dataBase/daoEmpleadodb");

// verificación 
const isValidRole = async (rol = '') => {

    const resultRol = await getIdRol(rol);

    if (!resultRol) {

        throw new Error(`Roll con id: ${rol} no existe`);

    }

}

// verificacion de correo exitente
const correoExists = async (correo) => {

    const { resultCorreo } = await getCorreoEmpleado(correo);

    if (resultCorreo != null) {

        throw new Error(`Correo: ${correo} ya está registrado`);

    }
}

// verificacion de id exitente
const isValidId = async (id) => {

    const resultId = await getIdEmpleado(id);
   
    if (!resultId) {

        throw new Error(`Empleado con id: ${id} no esta registrado`);
    
    }
}

module.exports = {
    isValidRole,
    correoExists,
    isValidId
}