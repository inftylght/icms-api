const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/list', async (req, res, next) => {
    try {
        const sql = `select *
                     from calculate`;
        const calculateQuery = await db.query(sql);
        res.send(calculateQuery.results);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
