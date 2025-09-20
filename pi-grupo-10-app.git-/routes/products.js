var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


// Ruta para detalle de producto
router.get('/detalle', productController.show);
router.get('/results', productController.results);
router.get('/add', productController.add);

//para el form de edicion de un producto
router.get('/edit/:id', productController.edit);  

module.exports = router;
