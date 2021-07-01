const { Schema, model } = require('mongoose');

const PedidoSquema = Schema({
    id: {
        type: String
    },

    numMesa: {
        type: Number
    },
    pedidoMesa: {
        type: String
    },
    total: {
        type: Number
    },
    estado: {
        type: Number
    },
    estadoCocina: {
        type: String
    }
});

PedidoSquema.methods.toJSON = function () {
    const { __v, _id, ...pedido } = this.toObject();
    return pedido;
}

module.exports = model('Pedido', PedidoSquema);
