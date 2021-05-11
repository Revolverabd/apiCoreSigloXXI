const { 
    isValidLogin,
    generateJWT
} = require('../helpers');


const login = async (req, res) => {

    const { Correo, Contrasenia } = req.body;

    try {

        // verificar si las credencial correo es correctas
        // verificar si el usuario está activo
        // verifica si la contrasenia corresponde
        const validate = await isValidLogin(Correo, Contrasenia);

        if (!validate) {

            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });

        } else {

            // generar el JWT
            const token = await generateJWT(validate);

            console.log(token);

            res.json({
                msg: 'OK',
                token
            });
        }


    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal hable con el administrador'
        });

    }

}

module.exports = {
    login
}