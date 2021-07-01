const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createPedido,
    pedidosGet,
    updatePedidoByNumMesa,
    pedidoMesaGet,
    pedidosGetAll,
    updatePedidoById
 } = require('../controllers/pedido.controller');

const router = Router();

router.get('/all',[
    // validateJWT,
    // isAdminRol,
], pedidosGet);

router.get('/allpedidos',[
    // validateJWT,
    // isAdminRol,
], pedidosGetAll);

router.get('/pedidoMesa/:numMesa',[
    // validateJWT,
    // isAdminRol,
], pedidoMesaGet);

router.post('/add', [
    // validateJWT,
    // isAdminRol,
], createPedido);

router.put('/updMesa/:numMesa', [
    // validateJWT,
    // isAdminRol,
], updatePedidoByNumMesa);

router.put('/updstatemesadespachada/:id', [
    // validateJWT,
    // isAdminRol,
], updatePedidoById);

module.exports = router;