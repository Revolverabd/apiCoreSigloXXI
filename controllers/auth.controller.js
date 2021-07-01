const {
    isValidLogin,
    generateJWT,
    googleVerify,

    emailClienteExists
} = require('../helpers');

const {
    createClienteService
} = require('../core/services/cliente.service');

const Cliente = require('../core/models/Cliente');

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
                Nombre: `${Nombre}  ${Apellido}`,
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

const googleSignIn = async (req, res) => {

    const { tokenId } = req.body;

    try {

        const { name, picture, email } = await googleVerify(tokenId);

        const data = {
            name,
            email,
            picture,
        }

        let cliente = new Cliente(data);

        let { emailDb, stateDb } = await emailClienteExists(email);

        console.log(emailDb)

        if (!emailDb) {
            await createClienteService(cliente);
        }

        if (stateDb === 0) {
            return res.status(401).json({
                msg: 'Hable con el administrador, Cliente bloqueado'
            });
        }

        // generar el JWT
        const token = await generateJWT(cliente._id);

        console.log(token);

        res.json({
            msg: 'OK',
            id: cliente._id,
            token,
            name,
            picture,
            email
        });

    } catch (error) {

        res.status(400).json({
            msg: 'token de google no es valido'
        });
    }

}

const revalidateJWT = async (req, res) => {

    const { stateDb: state, idDb: Id, rolDb: Rol, nombreDb: Nombre } = req.empleado;

    const token = await generateJWT(Id);

    res.json({
        msg: 'OK',
        state,
        Id,
        Rol,
        token,
        Nombre
    });
}

module.exports = {
    login,
    googleSignIn,
    revalidateJWT
}