const bcryptjs = require('bcryptjs');

const Empleado = require('../core/models/Empleado');

const {
    empleadosGetService,
    createEmpleadoService,
    updateEmpleadoByIdService,
    deleteEmpleadoByIdService,
    activateEmpleadoByIdService
} = require('../core/services/empleado.service');


const empleadosGet = async (req, res) => {

    try {

        const result = await empleadosGetService();
        res.json(result);

    } catch (error) {

        throw new Error(error);

    }


};

const empleadosGetByCampo = async (req, res) => {

    const result = await empleadosGetService();

    res.json(result);

};


const createEmpleado = async (req, res) => {

    try {

        const { Rut, Nombre, ApellidoMaterno, ApellidoPaterno, Correo, Telefono, Contrasenia, Rol } = req.body;
        const empleado = new Empleado({ Rut, Nombre, ApellidoMaterno, ApellidoPaterno, Correo, Telefono, Contrasenia, Rol });

        //encriptacion de la contraseña
        const salt = bcryptjs.genSaltSync();
        empleado.Contrasenia = bcryptjs.hashSync(Contrasenia, salt);

        await createEmpleadoService(empleado);

        res.json({ msg: 'OK' });

    } catch (error) {

        throw new Error(error);

    }

};

const updateEmpleadoById = async (req, res) => {

    try {

        const { id } = req.params;
        const { Nombre, ApellidoMaterno, ApellidoPaterno, Correo, Telefono, Contrasenia, EstadoEmpleado, Rol } = req.body;
        const empleado = new Empleado({ Nombre, ApellidoMaterno, ApellidoPaterno, Correo, Telefono, Contrasenia, EstadoEmpleado, Rol });

        const salt = bcryptjs.genSaltSync();
        empleado.Contrasenia = bcryptjs.hashSync(Contrasenia, salt);

        await updateEmpleadoByIdService(empleado, id);

        res.json({ msg: 'OK' });

    } catch (error) {

        throw new Error(error);

    }

};

const deleteEmpleadoById = async (req, res) => {

    try {
        
        const { id } = req.params;
    
        await deleteEmpleadoByIdService(id);
    
        res.json({ msg: 'OK' });

    } catch (error) {

        throw new Error(error);
    
    }

};

const activateEmpleadoById = async (req, res) => {

    try {
        
        const { id } = req.params;
    
        await activateEmpleadoByIdService(id);
    
        res.json({ msg: 'OK' });

    } catch (error) {

        throw new Error(error);
    
    }

};


module.exports = {
    empleadosGet,
    createEmpleado,
    updateEmpleadoById,
    deleteEmpleadoById,
    empleadosGetByCampo,
    activateEmpleadoById
    
}