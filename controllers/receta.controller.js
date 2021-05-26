const { recetasGetService } = require("../core/services/receta.service");


const recetasGet = async (req, res) => {

    try {

        const result = await recetasGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

module.exports = {
    recetasGet
}