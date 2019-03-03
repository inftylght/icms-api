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

router.get('/:id', async (req, res, next) => {
    try {
        let calculateRes = null;
        const params = {...req.params};
        const calculateSql = `select * from calculate where id=?`;
        const calculateQuery = await db.query(calculateSql, [Number(params.id)]);
        if (calculateQuery.results.length > 0) {
            calculateRes = calculateQuery.results[0];
            const calculateDetailSql = 'select * from calculate_detail where calculate_id=?';
            const calculateDetailQuery = await db.query(calculateDetailSql, [Number(params.id)]);
            calculateRes.forms = calculateDetailQuery.results;
        }
        res.json(calculateRes);
    } catch (error) {
        next(error)
    }
});

module.exports = router;
