var express = require('express');
var router = express.Router();
let userController = require('../controllers/userController');


/* GET home page. */
router.get('/', userController.profile );
router.get('/login', userController.login );
router.get('/register', userController.register );

module.exports = router;
