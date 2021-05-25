const { Router } = require('express');
const { check } = require('express-validator');

const {
    empleadosGet,
    createEmpleado,
    updateEmpleadoByRut,
    deleteEmpleadoByRut,
    empleadosGetByCampo,
    activateEmpleadoByRut
} = require('../controllers/empleado.controller');

const {
    roleExists,
    correoExists,
    rutExists,
    rutDoesNotExist,
    rutDoesNotExistDeactivate,
    rutDoesNotExistActivate,
} = require('../helpers');

const {
    validateJWT,
    validateFields,
    isAdminRol
} = require('../middlewares');

const router = Router();

router.get('/all',[
    validateJWT,
    isAdminRol,
], empleadosGet);

router.get('/one/:campo',[
    validateJWT,
    isAdminRol,
], empleadosGetByCampo);

router.post('/add', [
    validateJWT,
    isAdminRol,
    check('Rut', 'El rut es obligatorio').not().isEmpty(),
    check('Rut').custom(rutExists),
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ApellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('ApellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('Correo', 'El correo es obligatorio').not().isEmpty(),
    check('Correo', 'El correo no es válido').isEmail(),
    check('Correo').custom(correoExists),
    check('Telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('Contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    check('Contrasenia', 'La contraseña debe tener minimo un largo de 6 digitos').isLength({ min: 6 }),
    check('Rol').not().isEmpty(),
    check('Rol').custom(roleExists),
    validateFields
], createEmpleado);

router.put('/upd/:rut', [
    validateJWT,
    isAdminRol,
    check('rut').custom(rutDoesNotExist),
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ApellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('ApellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('Correo', 'El correo es obligatorio').not().isEmpty(),
    check('Correo', 'El correo no es válido').isEmail(),
    check('Telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('Rol', 'es obligatorio').not().isEmpty(),
    check('Rol').custom(roleExists),
    validateFields
], updateEmpleadoByRut);

router.delete('/del/:rut', [
    validateJWT,
    isAdminRol,
    check('rut').custom(rutDoesNotExistDeactivate),
    validateFields
], deleteEmpleadoByRut);

router.put('/act/:rut', [
    validateJWT,
    isAdminRol,
    check('rut').custom(rutDoesNotExistActivate),
    validateFields
], activateEmpleadoByRut);

module.exports = router;