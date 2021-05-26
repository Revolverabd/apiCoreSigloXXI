const { 
    getInsumos,
    saveInsumodb,
    updateInsumodb,
    softDeleteInsumodb,
    softActivateInsumodb
 } = require("../infrastructure/dataBase/daoInsumodb");


const insumosGetService = async () => {

    try {

        const result = await getInsumos();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

const createInsumoService = async (body) => {

    try {

        await saveInsumodb(body);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateInsumoByIdService = async (body, id) => {

    try {

        await updateInsumodb(body, id);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const deleteInsumoByIdService = async (id) => {

    try {

        await softDeleteInsumodb(id);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const activateInsumoByIdService = async (id) => {

    try {

        await softActivateInsumodb(id);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

module.exports = {
    insumosGetService,
    createInsumoService,
    updateInsumoByIdService,
    deleteInsumoByIdService,
    activateInsumoByIdService
}