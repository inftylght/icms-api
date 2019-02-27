const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = router;

router.get('/list', (req, res, next) => {
    const sql = `select *
                 from calculate`;
    db.query(sql)
        .then(([result]) => {
            res.json(result);
        })
        .catch(error => {
            res.status(500)
                .json(null);
        });
});

router.post('/', (req, res, next) => {
    const body = {...req.body};
    const sql = `insert into calculate(name, nameEN)
                 values (?, ?)`;
    db.query(sql, [body.name, body.nameEN])
        .then(([result]) => {
            const calculateId = result.insertId;
            const insertCalculateDetailSql = `insert into calculate_detail(name, nameEN, config, type, calculate_id)
                              values (?, ?, ?, ?, ?);`;

            res.json({status: 'success'});
        })
        .catch(error => {
            res.status(500)
                .json(null);
        });
});

router.put('/{id}', (req, res, next) => {
    const body = {...req.body};
    const param = req.params;
    const sql = `update calculate
                 set name=?,
                     nameEN=?
                 where id = ?`;
    db.query(sql, [body.name, body.nameEN, Number(body.id)])
        .then(([result]) => {
            res.json({status: 'success'});
        })
        .catch(error => {
            res.status(500)
                .json(null);
        });
});
