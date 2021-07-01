const { Router } = require('express');
const { check } = require('express-validator');

const {
    fileUpload,
    fileUpdate,
    showImg,
    fileUpdateCloudinary,
    fileUploadCloudinary
} = require('../controllers/uploads.controller');

const {
    allowedCollections
} = require('../helpers');

const {
    validateFileUp,
    validateFields } = require('../middlewares');

const router = Router();

/**
 * Uso de cloudinary
 */
router.post('/addcloudinary/:id', [
    validateFileUp,
    check('id', 'El id no es valido').isMongoId(),
], fileUploadCloudinary);

router.put('/udpcloudinary/:id', [
    validateFileUp,
    check('id', 'El id no es valido').isMongoId(),
    validateFields
], fileUpdateCloudinary);

/**
 * Uso del servidor local
 */

router.post('/:id/:collection', [
    validateFileUp,
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['bebestibles', 'casa', 'pastas', 'carnes', 'postres'])),
], fileUpload);

router.put('/upd/:id/:collection', [
    validateFileUp,
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['bebestibles', 'casa', 'pastas', 'carnes', 'postres'])),
    validateFields
], fileUpdate);

router.get('/show/:id/:collection', [
    // validateFileUp,
    check('id', 'El id no es valido').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['bebestibles', 'casa', 'pastas', 'carnes', 'postres'])),
    validateFields
], showImg);




module.exports = router;