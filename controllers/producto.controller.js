const {
    createProductoService
} = require("../core/services/producto.service");

const createProducto = async (req, res) => {

    try {
        const body = req.body;

        const id = await createProductoService(body);

        res.json({ id });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    createProducto
}