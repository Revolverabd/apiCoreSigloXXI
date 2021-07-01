const { Router } = require('express');
const { check } = require('express-validator');
const {
    createProducto,
    productosGet,
    updateProductoById,
    deleteProductoById
} = require('../controllers/producto.controller');

const router = Router();

router.get('/all', [
    // check('Correo','El correo es obligatorio').isEmail(),
    // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    // validateFields
], productosGet);

router.post('/add', [
    // check('Correo','El correo es obligatorio').isEmail(),
    // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    // validateFields
], createProducto);

router.put('/upd/:id', [
    // check('Correo','El correo es obligatorio').isEmail(),
    // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    // validateFields
], updateProductoById);

router.delete('/del/:id', [
//     // check('Correo','El correo es obligatorio').isEmail(),
//     // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
//     // validateFields
] , deleteProductoById);



module.exports = router;