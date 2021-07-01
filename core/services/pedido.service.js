const Pedido = require('../models/Pedido');
const {
    savePedidodb,
    getpedidos,
    establecerPedidodb,
    getpedidoMesa,
    getpedidosAll,
    despacharPedidodb
} = require('../infrastructure/dataBase/daoPedido');

const pedidosGetService = async () => {

    try {

        const result = await getpedidos();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

const pedidosGetAllService = async () => {

    try {

        const result = await getpedidosAll();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

const pedidoMesaGetService = async (numMesa) => {

    try {

        const result = await getpedidoMesa(numMesa);
        return result;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const createPedidoService = async (body) => {

    try {

        let pedido = new Pedido(body);

        //guardamos pedido
        await savePedidodb(pedido);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updatePedidoByNumMesaService = async (numMesa) => {

    try {

        await establecerPedidodb(numMesa);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updatePedidoByIdService = async (id) => {

    try {
        await despacharPedidodb(id);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};



module.exports = {
    createPedidoService,
    pedidosGetService,
    updatePedidoByNumMesaService,
    pedidoMesaGetService,
    pedidosGetAllService,
    updatePedidoByIdService
}