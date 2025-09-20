var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


// Ruta para detalle de producto
router.get('/detalle', productController.show);
router.get('/results', productController.results);
router.get('/add', productController.add);
module.exports = router;
