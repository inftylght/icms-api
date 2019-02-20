const express = require('express');
const router = express.Router();
const article = require('./article');
const calculate = require('./calculate');

router.use('/article', article);
router.use('/calculate', calculate);

module.exports = router;
