const { Schema, model } = require('mongoose');

const message = 'Es requerido';

const EmpleadoSquema = Schema({

    rut: {
        type: String,
        required: [true, `rut ${message}`]

    },
    nombre: {
        type: String,
        required: [true, `nombre ${message}`]

    },
    apellidoMaterno: {
        type: String,
        required: [true, `apellidoMaterno ${message}`]

    },
    apellidoPaterno: {
        type: String,
        required: [true, `apellidoPaterno ${message}`]

    },
    correo: {
        type: String,
        required: [true, `correo ${message}`]

    },
    telefono: {
        type: String,
        required: [true, `telefono ${message}`]

    },
    contrasenia: {
        type: String,
        required: [true, `contrasenia ${message}`]

    },
    estadoEmpleado: {
        type: Number,
        required: [true, `contrasenia ${message}`]
    },
    rol: {
        type: Number,
        required: [true, `contrasenia ${message}`]
    }

});

module.exports = model('Empleado', EmpleadoSquema);
