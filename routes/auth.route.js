const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { login,
    googleSignIn 
} = require('../controllers/auth.controller');


const router = Router();

router.post('/login',[
    check('Correo','El correo es obligatorio').isEmail(),
    check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    validateFields
]
, login);

router.post('/google',[
    check('tokenId','El tokenId es necesario').not().isEmpty(),
    // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    validateFields
]
, googleSignIn);



module.exports = router;