const express = require('express');
const router = express.Router();
const controladorHome = require('../controllers/mainController');

/* GET home page. */
router.get("/", controladorHome.home );

module.exports = router;
