const { empleadosGet,createEmpleado,updateEmpleadoById,deleteEmpleadoById,updateAnEmpleadoById} = require('../controllers/empleado.controller');

const { Router } = require('express');

const router = Router();

router.get('/',empleadosGet );

router.post('/',createEmpleado );

router.put('/:id',updateEmpleadoById );

router.delete('/',deleteEmpleadoById );

router.patch('/',updateAnEmpleadoById );


module.exports = router;