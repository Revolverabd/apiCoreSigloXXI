const { Router } = require('express');
const { check } = require('express-validator');

const { 
    mesasGet,
    createMesa,
    updateMesaByNumMesa } = require('../controllers/mesa.controller');

const router = Router();

router.get('/all',[
    // validateJWT,
    // isAdminRol,
], mesasGet);

router.post('/add', [
    // validateJWT,
    // isAdminRol,
], createMesa);

router.put('/upd/:numMesa', [
    // validateJWT,
    // isAdminRol,
], updateMesaByNumMesa);

module.exports = router;

//Falta validaciones