const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();

// router.get('/all',[
//     // check('Correo','El correo es obligatorio').isEmail(),
//     // check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
//     // validateFields
// ]
// , clientesGet);

// router.post('/add',[
//     check('Correo','El correo es obligatorio').isEmail(),
//     check('Contrasenia','La contraseña es obligatoria').not().isEmpty(),
//     validateFields
// ]
// , createCliente);



module.exports = router;