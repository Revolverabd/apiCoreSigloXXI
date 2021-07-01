const {
    createPedidoService,
    pedidosGetService,
    updatePedidoByNumMesaService,
    pedidoMesaGetService,
    pedidosGetAllService,
    updatePedidoByIdService
} = require("../core/services/pedido.service");

const pedidosGet = async (req, res) => {

    try {

        const result = await pedidosGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const pedidosGetAll = async (req, res) => {

    try {

        const result = await pedidosGetAllService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const pedidoMesaGet = async (req, res) => {

    try {

        const { numMesa } = req.params;

        const result = await pedidoMesaGetService(numMesa);
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const createPedido = async (req, res) => {

    try {

        const body = req.body;

        await createPedidoService(body);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updatePedidoByNumMesa = async (req, res) => {

    try {

        const { numMesa } = req.params;

        await updatePedidoByNumMesaService(numMesa);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const updatePedidoById = async (req, res) => {

    try {

        const { id } = req.params;

        await updatePedidoByIdService(id);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};


module.exports = {
    createPedido,
    pedidosGet,
    updatePedidoByNumMesa,
    pedidoMesaGet,
    pedidosGetAll,
    updatePedidoById
}