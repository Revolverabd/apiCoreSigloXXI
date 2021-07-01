const {
    savetransactdb,
    getPagos
} = require("../infrastructure/dataBase/daoPago");

const pagosGetService = async () => {

    try {

        const result = await getPagos();
        return result;

    } catch (error) {
        console.log(error);
        throw new Error();
    }

};


const transactDbService = async (pago) => {

    try {

        //guardamos pago
        await savetransactdb(pago);

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

module.exports = {
    transactDbService,
    pagosGetService
}