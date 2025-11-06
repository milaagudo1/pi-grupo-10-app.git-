var express = require('express');
var router = express.Router();
let controladorUsuarios = require('../controllers/userController');

/* Rutas de usuario */
router.get('/profile', controladorUsuarios.profile);

router.get('/login', controladorUsuarios.login);
router.post('/login', controladorUsuarios.login);

router.get('/register', controladorUsuarios.register);
router.post('/procesar_registro', controladorUsuarios.registerprocess);

/*router.post('/logout', controladorUsuarios.logout); */

module.exports = router;

