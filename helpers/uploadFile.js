const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['jpg', 'jpeg', 'png', 'gif'], binder = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const nameSplit = file.name.split('.');
        const extension = nameSplit[nameSplit.length - 1];

        if (!validExtensions.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, extensiones permitidas ${validExtensions}`);
        }

        const nameImgServer = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', binder, nameImgServer);

        file.mv(uploadPath, (error) => {
            if (error) {
                return reject(error);
            }
            console.log('img subida al servidor');
            resolve(nameImgServer)
        });

    });

}


module.exports = {
    uploadFile
}