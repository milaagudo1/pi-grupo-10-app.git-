var express = require('express');
var router = express.Router();
const controladorProductoDetalle = require('../controllers/productController');

// Ruta para detalle de producto
router.get('/detalle', controladorProductoDetalle.show);
module.exports = router;
