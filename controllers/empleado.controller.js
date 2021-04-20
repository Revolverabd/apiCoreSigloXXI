const bcryptjs = require('bcryptjs');

const Empleado = require('../core/models/Empleado');
const { empleadosGetService,
    createEmpleadoService,
    updateEmpleadoByIdService,
    deleteEmpleadoByIdService,
    updateAnEmpleadoByIdService,
    consultCorreo } = require('../core/services/empleado.service');


const empleadosGet = (req, res) => {

    res.json({
        msg: 'get'
    });
};

const createEmpleado = async (req, res) => {

    try {

        const { rut, nombre, apellidoMaterno, apellidoPaterno, correo, telefono, contrasenia, estadoEmpleado, rol } = req.body;
        const empleado = new Empleado({ rut, nombre, apellidoMaterno, apellidoPaterno, correo, telefono, contrasenia, estadoEmpleado, rol });

        //encriptacion de la contraseña
        const salt = bcryptjs.genSaltSync();
        empleado.contrasenia = bcryptjs.hashSync(contrasenia, salt);

        //verificacion de correo exitente
        const { resultCorreo } = await consultCorreo(correo);

        if (resultCorreo != null) {

            return res.status(400).json({
                msg: 'El correo ya existe'
            });

        }
        
        result
        const result = await createEmpleadoService(empleado);

        res.json({
            result
        });

    } catch (error) {

        throw new Error(error);

    }

};

const updateEmpleadoById = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put',
        id
    });
};

const deleteEmpleadoById = (req, res) => {
    res.json({
        msg: 'delete'
    });
};

const updateAnEmpleadoById = (req, res) => {
    res.json({
        msg: 'patch'
    });
};

module.exports = {
    empleadosGet,
    createEmpleado,
    updateEmpleadoById,
    deleteEmpleadoById,
    updateAnEmpleadoById
}