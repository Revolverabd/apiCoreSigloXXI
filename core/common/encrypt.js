const bcryptjs = require('bcryptjs');


const encryptContraseñia = async(contrasenia) => {

    const salt = await bcryptjs.genSaltSync();
    contraseniaEncript = await bcryptjs.hashSync(contrasenia, salt);
    return contraseniaEncript;
}

module.exports = {
    encryptContraseñia
}