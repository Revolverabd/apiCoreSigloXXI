const { Router } = require('express');
const { check } = require('express-validator');
const {
    clientesGet,
    deleteClienteByCorreo,
    activateClienteBycorreo
} = require('../controllers/cliente.controller');


const router = Router();

router.get('/all', [

    // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    // validateFields
], clientesGet);

router.delete('/del/:correo', [
    // validateJWT,
    // isAdminRol,
    // check('rut').custom(rutDoesNotExistDeactivate),
    // validateFields
], deleteClienteByCorreo);

router.put('/act/:correo', [
    // validateJWT,
    // isAdminRol,
    // check('rut').custom(rutDoesNotExistActivate),
    // validateFields
], activateClienteBycorreo);



module.exports = router;