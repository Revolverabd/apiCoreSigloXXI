const { Router } = require('express');
const { check } = require('express-validator');
const { 
    recetasGet,
    createReceta,
    updateRecetaById 
} = require('../controllers/receta.controller');

const router = Router();

router.get('/all',[
    // validateJWT,
    // isAdminRol,
], recetasGet);

router.post('/add', [
    // validateJWT,
    // isAdminRol,

], createReceta);

router.put('/upd/:id', [
    // validateJWT,
    // isAdminRol,
], updateRecetaById);

// router.delete('/del/:rut', [
//     validateJWT,
//     isAdminRol,
//     check('rut').custom(rutDoesNotExistDeactivate),
//     validateFields
// ], deleteEmpleadoByRut);

// router.put('/act/:rut', [
//     validateJWT,
//     isAdminRol,
//     check('rut').custom(rutDoesNotExistActivate),
//     validateFields
// ], activateEmpleadoByRut);

module.exports = router;