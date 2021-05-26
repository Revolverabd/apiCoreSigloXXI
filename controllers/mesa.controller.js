const { mesasGetService, 
    createMesaService,
    updateMesaByNumMesaService 
} = require("../core/services/mesa.service");

const mesasGet = async (req, res) => {

    try {

        const result = await mesasGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const createMesa = async (req, res) => {
    
    try {

        const body = req.body;

        await createMesaService(body);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateMesaByNumMesa = async (req, res) => {
    
    try {

        const { numMesa } = req.params;
        const body = req.body;

        await updateMesaByNumMesaService(body, numMesa);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

module.exports = {
    mesasGet,
    createMesa,
    updateMesaByNumMesa
}