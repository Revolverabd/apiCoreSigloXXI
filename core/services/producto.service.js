const Producto = require('../models/Producto');

const {
    saveProductodb,
    saveImgProductdb,
    updateImgProduct,
    getProductos,
    updateProductodb,
    deleteProductodb
} = require("../infrastructure/dataBase/daoProducto");

const productosGetService = async () => {

    try {
        const result = await getProductos();
        return result;
    } catch (error) {
        console.log(error);
        throw new Error();
    }
};

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

const updateProductoByIdService = async (body, id) => {

    try {

        let producto = new Producto(body);
        await updateProductodb(producto, id);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};


const deletePorductoByIdService = async (id) => {

    try {

        await deleteProductodb(id);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

/**
 * Tratamientos de imagenes relacionadas con producto 
 */
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
    productosGetService,
    createProductoService,
    createImgProductService,
    updateImgProductService,
    updateProductoByIdService,
    deletePorductoByIdService
}