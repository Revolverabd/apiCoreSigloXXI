const { 
    insumosGetService,
    createInsumoService,
    updateInsumoByIdService,
    deleteInsumoByIdService,
    activateInsumoByIdService
} = require("../core/services/insumo.service");



const insumosGet = async (req, res) => {

    try {

        const result = await insumosGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const createInsumo = async (req, res) => {
    
    try {

        const body = req.body;

        await createInsumoService(body);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateInsumoById = async (req, res) => {
    
    try {

        const { id } = req.params;
        const body = req.body;

        await updateInsumoByIdService(body, id);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const deleteInsumoById = async (req, res) => {
    
    try {

        const { id } = req.params;

        await deleteInsumoByIdService(id);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const activateInsumoById = async (req, res) => {
    
    try {

        const { id } = req.params;

        await activateInsumoByIdService(id);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

module.exports = {
    insumosGet,
    createInsumo,
    updateInsumoById,
    deleteInsumoById,
    activateInsumoById
}