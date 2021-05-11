
const {
    empleadosGetService,
    empleadosGetCampoService,
    createEmpleadoService,
    updateEmpleadoByRutService,
    deleteEmpleadoByRutService,
    activateEmpleadoByRutService
} = require('../core/services/empleado.service');

const empleadosGet = async (req, res) => {

    try {

        const result = await empleadosGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const empleadosGetByCampo = async (req, res) => {


    try {

        const { campo } = req.params;

        const result = await empleadosGetCampoService(campo);

        if (!result.length > 0) {

            const msg = res.json({ msg: 'Empleado no esxite en la DB' });
            return msg;

        }

        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const createEmpleado = async (req, res) => {
    
    try {

        const body = req.body;

        await createEmpleadoService(body);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateEmpleadoByRut = async (req, res) => {
    
    try {

        const { rut } = req.params;
        const body = req.body;

        await updateEmpleadoByRutService(body, rut);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const deleteEmpleadoByRut = async (req, res) => {
    
    try {

        const { rut } = req.params;

        await deleteEmpleadoByRutService(rut);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const activateEmpleadoByRut = async (req, res) => {
    
    try {

        const { rut } = req.params;

        await activateEmpleadoByRutService(rut);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};


module.exports = {
    empleadosGet,
    createEmpleado,
    updateEmpleadoByRut,
    deleteEmpleadoByRut,
    empleadosGetByCampo,
    activateEmpleadoByRut

}