const express = require('express');
const router = express.Router();
const path = require('path');

/* Config File Controller */
const CONFIG = require(path.join(__dirname, '../controllers/config-file.js'));

/* Config File Routes */
router.post('/', CONFIG.CreateConfigFile);
router.get('/setup', CONFIG.GetConfigFile);

module.exports = router;
