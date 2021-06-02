const { 
    recetasGetService,
    createRecetaService,
    updateRecetaByIdService
 } = require("../core/services/receta.service");

const recetasGet = async (req, res) => {

    try {

        const result = await recetasGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const createReceta = async (req, res) => {
    
    try {

        const body = req.body;

        await createRecetaService(body);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateRecetaById = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        await updateRecetaByIdService(body, id);
        res.json({ msg: 'OK' });
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    recetasGet,
    createReceta,
    updateRecetaById
}