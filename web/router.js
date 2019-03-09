const express = require('express');
const router = express.Router();
const article = require('./article');
const calculate = require('./calculate');
const config = require('./config');

router.use('/article', article);
router.use('/calculate', calculate);
router.use('/config', config);

module.exports = router;
