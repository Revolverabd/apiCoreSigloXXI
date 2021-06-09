const { Schema, model } = require('mongoose');

const EmpleadoSquema = Schema({
    Id: {
        type: String
    },
    Rut: {
        type: String
    },
    Nombre: {
        type: String
    },
    ApellidoMaterno: {
        type: String
    },
    ApellidoPaterno: {
        type: String
    },
    Correo: {
        type: String
    },
    Telefono: {
        type: String
    },
    Contrasenia: {
        type: String
    },
    EstadoEmpleado: {
        type: Number
    },
    Rol: {
        type: Number
    }

});

EmpleadoSquema.methods.toJSON = function () {
    const { __v, Contrasenia, _id, ...empleado } = this.toObject();
    return empleado;
}

module.exports = model('Empleado', EmpleadoSquema);
