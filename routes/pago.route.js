const { Router } = require('express');

const {
    pagosGet,
    transactDb,
    finalTable
} = require('../controllers/pago.controller');

const router = Router();

router.get('/all', pagosGet);

router.post('/create', transactDb);

router.post('/final/:numMesa', finalTable);

module.exports = router;