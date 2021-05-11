const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validateFields');


const router = Router();

router.post('/login',[
    check('Correo','El correo es obligatorio').isEmail(),
    check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    validateFields
]
, login);




module.exports = router;