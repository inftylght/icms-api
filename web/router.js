const express = require('express');
const router = express.Router();
const article = require('./article');

router.use('/article', article);

module.exports = router;
