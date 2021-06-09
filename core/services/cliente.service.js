const Cliente = require('../models/Cliente');
const {
    saveClientedb,
    getClientes,
    softDeleteClientedb,
    softActivateClientedb

} = require('../infrastructure/dataBase/daoCliente');

const clientesGetService = async () => {

    try {

        const result = await getClientes();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

const createClienteService = async (cliente) => {

    try {

        //guardamos cliente
        await saveClientedb(cliente);

    } catch (error) {
        // console.log(error);
        throw new Error(error);
    }

};


const deleteClienteByCorreoService = async (correo) => {

    try {

        await softDeleteClientedb(correo);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const activateClienteByCorreoService = async (correo) => {

    try {

        await softActivateClientedb(correo);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

module.exports =
{
    createClienteService,
    clientesGetService,
    deleteClienteByCorreoService,
    activateClienteByCorreoService
}