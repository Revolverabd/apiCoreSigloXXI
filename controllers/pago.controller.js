const {
    pagosGetService,
    transactDbService
} = require('../core/services/pago.service');


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




module.exports = {
    pagosGet,
    transactDb
}