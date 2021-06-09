const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

const {
    uploadFile,
    imgProductExists
} = require('../helpers');

const {
    updateImgProductService,
    createImgProductService
} = require('../core/services/producto.service');

cloudinary.config(process.env.CLOUDINARY_URL);

/**
 * Uso de cloudinary para las imagenes
 */
const fileUploadCloudinary = async (req, res) => {

    const { id } = req.params;

    try {

        // sube la imagen a servicio de cloudinary
        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        
        await createImgProductService(id, secure_url);

        res.json({
            msg: 'OK',
            id,
            secure_url
        });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const fileUpdateCloudinary = async (req, res) => {

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

    // sube la imagen a servicio de cloudinary
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);


    await updateImgProductService(idDb, secure_url);

    res.json({
        msg: 'OK',
        secure_url
    })

}


/**
 * SERVIDOR LOCAL 
 */

const fileUpload = async (req, res) => {

    const { id, collection } = req.params;

    try {

        const name = await uploadFile(req.files, undefined, collection);

        await createImgProductService(id, name);

        res.json({
            id,
            name
        });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const fileUpdate = async (req, res) => {

    const { id, collection } = req.params;

    const { idDb, nameDb } = await imgProductExists(id);

    if (!nameDb || !idDb) {
        return res.status(400).json({
            msg: `No existe un producto con el id ${id}`
        });
    }

    //elimina la imagen si está en en el servidor
    if (nameDb != null || idDb != null) {
        const pathImg = path.join(__dirname, '../uploads/', collection, nameDb);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    //sube la imagen al servidor
    const name = await uploadFile(req.files, undefined, collection);

    await updateImgProductService(idDb, name);

    res.json({
        idProducto: id,
        collection,
        nameIMG: name
    })

}

const showImg = async (req, res) => {

    const { id, collection } = req.params;

    const { idDb, nameDb } = await imgProductExists(id);
    console.log(idDb, nameDb)
    if (!nameDb || !idDb) {
        return res.status(400).json({
            msg: `No existe un producto con el id ${id}`
        });
    }

    if (nameDb != null || idDb != null) {
        const pathImg = path.join(__dirname, '../uploads/', collection, nameDb);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    const pathImg = path.join(__dirname, '../assets/no-image.jpg',);
    return res.sendFile(pathImg);
}



module.exports = {
    fileUploadCloudinary,
    fileUpdateCloudinary,
    
    fileUpload,
    fileUpdate,
    showImg
}