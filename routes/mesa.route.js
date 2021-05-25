const { Router } = require('express');
const { check } = require('express-validator');

const { mesasGet } = require('../controllers/mesa.controller');

const router = Router();

router.get('/all',[
    // validateJWT,
    // isAdminRol,
], mesasGet);



module.exports = router;