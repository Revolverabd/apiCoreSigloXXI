const { Router } = require('express');
const { check } = require('express-validator');
const { createProducto } = require('../controllers/producto.controller');


const router = Router();

// router.get('/all',[
//     // check('Correo','El correo es obligatorio').isEmail(),
//     // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
//     // validateFields
// ]
// , clientesGet);

router.post('/add',[
    // check('Correo','El correo es obligatorio').isEmail(),
    // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
    // validateFields
]
, createProducto);



module.exports = router;