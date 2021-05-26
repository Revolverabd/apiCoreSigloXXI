const Empleado = require('../models/Empleado');
const { encryptContraseñia } = require('../common/encrypt');

const { 
    getEmpleados,
    getEmpleadosCampo,
    saveEmpleadodb,
    updateEmpleadodb,
    softDeleteEmpleadodb,
    softActivateEmpleadodb
} = require('../infrastructure/dataBase/daoEmpleadodb');

const empleadosGetService = async () => {

    try {

        const result = await getEmpleados();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

const empleadosGetCampoService = async (campo) => {

    try {

        const result = await getEmpleadosCampo(campo);
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

const createEmpleadoService = async (body) => {

    try {

        let empleado = new Empleado(body);

        //encriptacion de la contraseña  
        empleado.Contrasenia = await encryptContraseñia(empleado.Contrasenia);

        //guardamos empleado
        await saveEmpleadodb(empleado);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateEmpleadoByRutService = async (body, rut) => {

    try {

        let empleado = new Empleado(body, rut);

        //encriptacion de la contraseña  
        empleado.Contrasenia = await encryptContraseñia(empleado.Contrasenia);

        await updateEmpleadodb(empleado, rut);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const deleteEmpleadoByRutService = async (rut) => {

    try {

        await softDeleteEmpleadodb(rut);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const activateEmpleadoByRutService = async (rut) => {

    try {

        await softActivateEmpleadodb(rut);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};


module.exports = {
    empleadosGetService,
    empleadosGetCampoService,
    createEmpleadoService,
    updateEmpleadoByRutService,
    deleteEmpleadoByRutService,
    activateEmpleadoByRutService
}