const { Router } = require('express');

const {
    pagosGet,
    transactDb
} = require('../controllers/pago.controller');

const router = Router();

router.get('/all', pagosGet);

router.post('/create', transactDb);

module.exports = router;