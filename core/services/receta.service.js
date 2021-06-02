const { 
    getRecetas,
    saveRecetadb,
    updateRecetadb
 } = require("../infrastructure/dataBase/daoRecetadb");

const recetasGetService = async () => {

    try {

        const result = await getRecetas();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

const createRecetaService = async (body) => {

    try {

        await saveRecetadb(body);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateRecetaByIdService = async (body, id) => {
    try {
        await updateRecetadb(body, id);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

module.exports = {
    recetasGetService,
    createRecetaService,
    updateRecetaByIdService
}