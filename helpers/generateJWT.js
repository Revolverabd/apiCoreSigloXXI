
const jwt = require('jsonwebtoken');

const generateJWT = (guid) => {

    return new Promise((resolve, reject) => {

        const payload = { guid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {

            expiresIn: '2h'

        }, (error, token) => {

            if (error) {

                console.log(error);
                reject('No se pudo generar token');

            }
            else {

                resolve(token);

            }

        });

    });

}

module.exports = {
    generateJWT
}