const WebpayPlus = require('transbank-sdk').WebpayPlus; // ES5

// Es necesario ejecutar dentro de una función async para utilizar await
const transact = async (req, res) => {

    const { buy_order, session_id, amount, return_url } = req.body;

    const createResponse = await WebpayPlus.Transaction.create(
        buy_order,
        session_id,
        amount,
        return_url
    );

    res.json(createResponse);
}

const transactInfo = async (req, res) => {
    res.redirect('http://localhost:3000/pbi/pago');
}

module.exports = {
    transact,
    transactInfo
}