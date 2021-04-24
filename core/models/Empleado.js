const { Schema, model } = require('mongoose');

const message = 'Es requerido';

const EmpleadoSquema = Schema({
    Id: {
        type: Number
    },
    Rut: {
        type: String,
        required: [true, `rut ${message}`]

    },
    Nombre: {
        type: String,
        required: [true, `nombre ${message}`]

    },
    ApellidoMaterno: {
        type: String,
        required: [true, `apellidoMaterno ${message}`]

    },
    ApellidoPaterno: {
        type: String,
        required: [true, `apellidoPaterno ${message}`]

    },
    Correo: {
        type: String,
        required: [true, `correo ${message}`]

    },
    Telefono: {
        type: String,
        required: [true, `telefono ${message}`]

    },
    Contrasenia: {
        type: String,
        required: [true, `contrasenia ${message}`]

    },
    EstadoEmpleado: {
        type: Number,
        required: [true, `contrasenia ${message}`]
    },
    Rol: {
        type: Number,
        required: [true, `contrasenia ${message}`]
    }

});

EmpleadoSquema.methods.toJSON = function () {
    const { __v, Contrasenia, _id, ...empleado } = this.toObject();
    return empleado;
}

module.exports = model('Empleado', EmpleadoSquema);
