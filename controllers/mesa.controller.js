const { mesasGetService } = require("../core/services/mesa.service");

const mesasGet = async (req, res) => {

    try {

        const result = await mesasGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

module.exports = {
    mesasGet
}