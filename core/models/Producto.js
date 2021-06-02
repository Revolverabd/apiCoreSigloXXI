const { Schema, model } = require('mongoose');

const ProductoSquema = Schema({
    Id: {
        type: Number
    },
    Nombre: {
        type: String
    },
    Descripcion: {
        type: String
    },
    PrecioNeto: {
        type: Number
    },
    IdCategoria: {
        type: Number
    }

});

ProductoSquema.methods.toJSON = function () {
    const { __v, _id, ...producto } = this.toObject();
    return producto;
}

module.exports = model('Producto', ProductoSquema);
