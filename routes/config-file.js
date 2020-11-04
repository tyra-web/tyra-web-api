const express = require('express');
const router = express.Router();
const path = require('path');
const AUTH_TOKEN = require('../middlewares/authenticateToken.js');

/* Config File Controller */
const CONFIG = require(path.join(__dirname, '../controllers/config-file.js'));

/* Config File Routes */
router.post('/', AUTH_TOKEN, CONFIG.CreateConfigFile);
router.get('/setup', AUTH_TOKEN, CONFIG.GetConfigFile);

module.exports = router;
