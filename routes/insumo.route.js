const { Router } = require('express');
const { check } = require('express-validator');

const { 
    insumosGet,
    createInsumo,
    updateInsumoById,
    deleteInsumoById,
    activateInsumoById
} = require('../controllers/insumo.controller');

const router = Router();

router.get('/all',[
    // validateJWT,
    // isAdminRol,
], insumosGet);

router.post('/add', [
    // validateJWT,
    // isAdminRol,
], createInsumo);

router.put('/upd/:id', [
    // validateJWT,
    // isAdminRol,
], updateInsumoById);

router.delete('/del/:id', [
    // validateJWT,
    // isAdminRol,
    // check('rut').custom(rutDoesNotExistDeactivate),
    // validateFields
], deleteInsumoById);

router.put('/act/:id', [
    // validateJWT,
    // isAdminRol,
    // check('rut').custom(rutDoesNotExistActivate),
    // validateFields
], activateInsumoById);


module.exports = router;

//Falta validaciones