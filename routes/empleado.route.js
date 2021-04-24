const { Router } = require('express');
const { check } = require('express-validator');

const {
    empleadosGet,
    createEmpleado,
    updateEmpleadoById,
    deleteEmpleadoById,
    empleadosGetByCampo,
    activateEmpleadoById
} = require('../controllers/empleado.controller');

const { validateFields } = require('../middlewares/validateFields');
const { isValidRole, correoExists, isValidId } = require('../helpers/dbValidator');

const router = Router();

router.get('/', empleadosGet);
router.get('/campo', empleadosGetByCampo);

router.post('/', [
    check('Rut', 'El rut es obligatorio').not().isEmpty(),
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
    check('Rol').custom(isValidRole),
    validateFields
], createEmpleado);

router.put('/:id', [
    check('id').custom(isValidId),
    check('Nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('ApellidoMaterno', 'El apellido materno es obligatorio').not().isEmpty(),
    check('ApellidoPaterno', 'El apellido paterno es obligatorio').not().isEmpty(),
    check('Correo', 'El correo es obligatorio').not().isEmpty(),
    check('Correo', 'El correo no es válido').isEmail(),
    check('Telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('Contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    check('Contrasenia', 'La contraseña debe tener minimo un largo de 6 digitos').isLength({ min: 6 }),
    check('EstadoEmpleado', 'El estado es obligatorio').not().isEmpty(),
    check('Rol', 'es obligatorio').not().isEmpty(),
    check('Rol').custom(isValidRole),
    validateFields
], updateEmpleadoById);

router.delete('/:id', [
    check('id').custom(isValidId),
], deleteEmpleadoById);

router.put('/activate/:id', [
    check('id').custom(isValidId),
], activateEmpleadoById);


module.exports = router;
