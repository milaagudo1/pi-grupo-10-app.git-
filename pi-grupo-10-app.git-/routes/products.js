var express = require('express');
var router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1])
  }
})

const upload = multer({ storage: storage })

const productController = require('../controllers/productController');


// Ruta para detalle de producto
router.get('/detalle/:id', productController.show);
router.get('/results', productController.results);
//
router.post('/store', upload.single('imagen'), productController.store);
//
router.get('/add', productController.add);

//para el form de edicion de un producto
router.get('/edit/:id', productController.edit);  

module.exports = router;
