const { getMesas } = require("../infrastructure/dataBase/daoMesadb");

const mesasGetService =  async() =>{

    try {

        const result = await getMesas();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

}

module.exports = {
    mesasGetService
}


