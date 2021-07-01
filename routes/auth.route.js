const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { login,
    googleSignIn,
    revalidateJWT
} = require('../controllers/auth.controller');

const { validateJWT } = require('../middlewares/validateJWT');


const router = Router();

router.post('/login', [
    check('Correo', 'El correo es obligatorio').isEmail(),
    check('Contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    check('tokenId', 'El tokenId es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

router.get('/renew', validateJWT, revalidateJWT);



module.exports = router;