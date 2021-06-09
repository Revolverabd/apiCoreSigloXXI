const {
    clientesGetService,
    deleteClienteByCorreoService,
    activateClienteByCorreoService

} = require("../core/services/cliente.service");

const clientesGet = async (req, res) => {

    try {
        const result = await clientesGetService();
        res.json(result);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const deleteClienteByCorreo = async (req, res) => {

    try {
        const { correo } = req.params;
        await deleteClienteByCorreoService(correo);
        res.json({ msg: 'OK' });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const activateClienteBycorreo = async (req, res) => {

    try {
        const { correo } = req.params;
        await activateClienteByCorreoService(correo);
        res.json({ msg: 'OK' });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

module.exports = {
    clientesGet,
    deleteClienteByCorreo,
    activateClienteBycorreo
}