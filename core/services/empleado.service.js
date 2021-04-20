const { saveEmpleadodb
    , getCorreoEmpleado } = require('../infrastructure/dataBase/daoEmpleadodb');


const empleadosGetService = async (dataEmpleado) => {

    try {


    } catch (error) {

        throw new Error();

    }


};

const createEmpleadoService = async (empleado) => {

    try {

        const result = await saveEmpleadodb(empleado);
        return result;

    } catch (error) {

        throw new Error(error);
    }

};

const consultCorreo = async (correo) => {

    try {

        const correoDb = await getCorreoEmpleado(correo);
        return correoDb;

    } catch (error) {

        throw new Error(error);
    }

};



const updateEmpleadoByIdService = () => {

};

const deleteEmpleadoByIdService = () => {

};

const updateAnEmpleadoByIdService = () => {

};



module.exports = {
    empleadosGetService,
    createEmpleadoService,
    updateEmpleadoByIdService,
    deleteEmpleadoByIdService,
    updateAnEmpleadoByIdService,
    consultCorreo
}