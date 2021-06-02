const Producto = require('../models/Producto');

const {
    saveProductodb
} = require("../infrastructure/dataBase/daoProducto");

const createProductoService = async (body) => {

    let producto = new Producto(body);

    try {
        const idDb = await saveProductodb(producto);
        return idDb;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    createProductoService
}