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
        const { idDb: Id, RolDb: Rol, nombreDb: Nombre, apePaDb: Apellido } = await isValidLogin(Correo, Contrasenia);

        if (!Id) {

            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });

        } else {

            // generar el JWT
            const token = await generateJWT(Id);

            console.log(token);

            res.json({
                ok: true,
                msg: 'OK',
                Rol,
                Id,
                Nombre,
                Apellido,
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

const googleSignIn = (req, res) => {

    const { Correo, googleId, Nombre, tokenId } = req.body;
    console.log(req);
    res.json({
        msg: 'OK',
        Correo,
        googleId,
        Nombre,
        tokenId
    })

}

module.exports = {
    login,
    googleSignIn
}