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

router.post('/', async (req, res, next) => {
    try {
        const body = {...req.body};
        const sql = `insert into calculate(name, nameEN, formula)
                 values (?, ?, ?)`;
        const calculateResult = await db.query(sql, [body.name, body.nameEN, body.formula]);
        const calculateId = calculateResult.results.insertId;

        const insertCalculateDetailSql = `insert into calculate_detail(name, nameEN, config, type, calculate_id, variable)
                                          values (?, ?, ?, ?, ?, ?);`;
        const forms = body.forms;

        for (let form of forms) {
            let config = null;
            if (form.type==='Number') {
                config = form.value;
            } else if (form.type==='Selection'){
                config = form.selectionList;
            }
            await db.query(insertCalculateDetailSql,
                [form.name, form.nameEN, JSON.stringify(config), form.type, calculateId, form.variable]);
        }
        res.json({status: 'success'});

    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const body = {...req.body};
        const calculateUpdateSql = `update calculate
                 set name=?,
                     nameEN=?,
                     formula=?
                 where id = ?`;
        await db.query(calculateUpdateSql, [body.name, body.nameEN, body.formula, Number(body.id)]);
        const calculateDetailDeleteSql = `delete from calculate_detail where calculate_id=?`;
        await db.query(calculateDetailDeleteSql, [Number(body.id)]);

        const insertCalculateDetailSql = `insert into calculate_detail(name, nameEN, config, type, calculate_id, variable)
                                          values (?, ?, ?, ?, ?, ?);`;

        const forms = body.forms;

        for (let form of forms) {
            let config = null;
            if (form.type==='Number') {
                config = form.value;
            } else if (form.type==='Selection'){
                config = form.selectionList;
            }
            db.query(insertCalculateDetailSql,
                [form.name, form.nameEN, JSON.stringify(config), form.type, body.id, form.variable]);
        }
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
