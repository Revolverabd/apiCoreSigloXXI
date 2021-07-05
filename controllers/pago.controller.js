const {
    pagosGetService,
    transactDbService
} = require('../core/services/pago.service');

const { finalTableDb } = require('../core/infrastructure/dataBase/daoPago');


const pagosGet = async (req, res) => {

    try {

        const result = await pagosGetService();
        res.json(result);

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};

const transactDb = async (req, res) => {

    try {

        const body = req.body;

        await transactDbService(body);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

const finalTable = async (req, res) => {

    try {

        const { numMesa } = req.params;


        await finalTableDb(numMesa);

        res.json({ msg: 'OK' });

    } catch (error) {
        console.log(error);
        throw new Error(error);

    }

};



module.exports = {
    pagosGet,
    transactDb,
    finalTable
}