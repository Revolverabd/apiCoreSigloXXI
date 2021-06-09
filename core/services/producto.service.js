const Producto = require('../models/Producto');

const {
    saveProductodb,
    saveImgProductdb,
    updateImgProduct
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

const createImgProductService = async (id, name) => {


    try {
        await saveImgProductdb(id, name);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

const updateImgProductService = async (id, name) => {
    try {

        await updateImgProduct(id, name);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = {
    createProductoService,
    createImgProductService,
    updateImgProductService
}