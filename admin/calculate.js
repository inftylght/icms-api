const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = router;

router.get('/list', (req, res, next) => {
    const sql = `select * from calculate`;
    db.query(sql)
        .then(([result]) => {
            res.json(result);
        })
        .catch(error => {
            res.status(500)
                .json(null);
        });
});
