const { uploadFile } = require("../helpers");


const fileUpload = async (req, res) => {

    console.log(req.files);
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json('No hay archivos en la petición');
        return;
    }

    // console.log('pasa la info');

    try {

        const name = await uploadFile(req.files, undefined, 'imgs');

        res.json({
            name
        });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

module.exports = {
    fileUpload
}