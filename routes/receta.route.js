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



module.exports = router;