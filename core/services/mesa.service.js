const { getMesas, saveMesadb,updateMesadb } = require("../infrastructure/dataBase/daoMesadb");

const mesasGetService =  async() =>{

    try {

        const result = await getMesas();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

}

const createMesaService = async (body) => {

    try {

        await saveMesadb(body);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const updateMesaByNumMesaService = async (body, numeroMesa) => {

    try {

        await updateMesadb(body, numeroMesa);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

module.exports = {
    mesasGetService,
    createMesaService,
    updateMesaByNumMesaService
}


