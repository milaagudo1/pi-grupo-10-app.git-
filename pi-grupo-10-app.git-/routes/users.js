var express = require('express');
var router = express.Router();
let controladorUsuarios = require('../controllers/userController');

/* Rutas de usuario */
router.get('/profile', controladorUsuarios.profile);
router.get('/login', controladorUsuarios.login);
router.get('/register', controladorUsuarios.register);

module.exports = router;
