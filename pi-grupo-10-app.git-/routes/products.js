var express = require('express');
var router = express.Router();
let mainController = require('../controllers/productController');
const productController = require('../controllers/productController');

/* GET home page. */
router.get('/', productController.productDetail );
router.get('/add', productController.addProduct );

module.exports = router;