const { Router } = require('express');

const {
    transact,
    transactInfo
} = require('../controllers/webpay');

const router = Router();

router.post('/create', transact);

router.post('/info', transactInfo);

module.exports = router;