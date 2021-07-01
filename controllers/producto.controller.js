const cloudinary = require('cloudinary').v2;


const {
    createProductoService,
    productosGetService,
    updateProductoByIdService,
    deletePorductoByIdService
} = require("../core/services/producto.service");

const {
    imgProductExists
} = require("../helpers");

const productosGet = async (req, res) => {

    try {
        const result = await productosGetService();
        res.json(result);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

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

const updateProductoById = async (req, res) => {

    try {

        const { id } = req.params;
        const body = req.body;
        await updateProductoByIdService(body, id);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const deleteProductoById = async (req, res) => {

    try {

        const { id } = req.params;

        const { idDb, nameDb } = await imgProductExists(id);

        if (!idDb || !nameDb) {
            return res.status(400).json({
                msg: `No existe un producto con el id ${id}`
            });
        }

        //elimina la imagen si está en cloudinary
        if (nameDb != null || idDb != null) {
            const nameArr = nameDb.split('/');
            const name = nameArr[nameArr.length - 1];
            const [public_id] = name.split('.');

            cloudinary.uploader.destroy(public_id);
        }

        await deletePorductoByIdService(id);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


module.exports = {
    createProducto,
    productosGet,
    updateProductoById,
    deleteProductoById
}