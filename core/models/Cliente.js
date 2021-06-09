const { Schema, model } = require('mongoose');

const ClienteSquema = Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    picture: {
        type: String
    },
    EstadoEmpleado: {
        type: Number
    }
});

ClienteSquema.methods.toJSON = function () {
    const { __v, _id, ...cliente } = this.toObject();
    return cliente;
}

module.exports = model('Cliente', ClienteSquema);
