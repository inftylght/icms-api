const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = router;

router.get('/list', async (req, res, next) => {
    try {
        const sql = `select *
                 from calculate`;
        const calculateResults = await db.query(sql);
        res.send(calculateResults.results);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = {...req.body};
        const sql = `insert into calculate(name, nameEN, formula)
                 values (?, ?, ?)`;
        const calculateResult = await db.query(sql, [body.name, body.nameEN, body.formula]);
        const calculateId = calculateResult.results.insertId;

        const insertCalculateDetailSql = `insert into calculate_detail(name, nameEN, config, type, calculate_id)
                                          values (?, ?, ?, ?, ?);`;
        const calculateDetailsSQueries = [];

        const forms = body.forms;

        for (let form of forms) {
            let config = null;
            if (form.type==='Number') {
                config = form.value;
            } else if (form.type==='Selection'){
                config = form.selectionList;
            }
            calculateDetailsSQueries.push(db.query(insertCalculateDetailSql,
                [form.name, form.nameEN, JSON.stringify(config), form.type, calculateId]));
        }

        await Promise.all(calculateDetailsSQueries);
        res.json({status: 'success'});

    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const body = {...req.body};
        const param = req.params;
        const sql = `update calculate
                 set name=?,
                     nameEN=?
                 where id = ?`;

        await db.query(sql, [body.name, body.nameEN, Number(body.id)]);

        res.json({status: 'success'});
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const params = {...req.params};
        const deleteCalculateSql = `delete
                 from calculate
                 where id = ?`;
        const deleteCalculateDetailSql = `
            delete from calculate_detail
            where calculate_id=?
        `;
        const deleteQueriesPromise = [
            db.query(deleteCalculateSql, [Number(params.id)]),
            db.query(deleteCalculateDetailSql, [Number(params.id)])
        ];
        await Promise.all(deleteQueriesPromise);
        res.json({status: 'success'});
    } catch (error) {
        next(error);
    }
})
