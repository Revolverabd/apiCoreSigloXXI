const { saveEmpleadodb,
    updateEmpleadodb,
    getEmpleados,
    softDeleteEmpleadodb,
    softActivateEmpleadodb
} = require('../infrastructure/dataBase/daoEmpleadodb');


const empleadosGetService = async () => {

    try {

        const result = await getEmpleados();
        return result;

    } catch (error) {

        throw new Error();

    }


};

const createEmpleadoService = async (empleado) => {

    try {

        await saveEmpleadodb(empleado);

    } catch (error) {

        throw new Error(error);
    }

};

const updateEmpleadoByIdService = async (empleado, id) => {

    try {

        await updateEmpleadodb(empleado, id);

    } catch (error) {

        throw new Error(error);
    }

};

const deleteEmpleadoByIdService = async (id) => {

    try {

        await softDeleteEmpleadodb(id);

    } catch (error) {

        throw new Error(error);

    }

};

const activateEmpleadoByIdService = async (id) => {

    try {

        await softActivateEmpleadodb(id);

    } catch (error) {

        throw new Error(error);

    }

};


module.exports = {
    empleadosGetService,
    createEmpleadoService,
    updateEmpleadoByIdService,
    deleteEmpleadoByIdService,
    activateEmpleadoByIdService
}