const { getRecetas } = require("../infrastructure/dataBase/daoRecetadb");

const recetasGetService = async () => {

    try {

        const result = await getRecetas();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};

module.exports = {
    recetasGetService
}