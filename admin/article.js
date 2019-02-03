const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/list', (req, res, next) => {
    const sql = `select * from article`;
    db.query(sql)
        .then(([results]) => {
            const articleList = [];
            for (const result of results) {
                articleList.push({
                    id: result.id,
                    title: result.title
                });
            }
            res.send(articleList);
        });
});

router.get('/:id', (req, res, next) => {
    const params = {...req.params};
    const sql = `select article.id      as id,
                       article.title   as title,
                       article.text    as text
                from article
                where article.id=?`;
    db.query(sql, [Number(params.id)])
        .then(([results]) => {
            let article = null;
            for (const result of results) {
                article = {
                    id: result.id,
                    title: result.title,
                    text: result.text
                };
            }
            res.json(article);
        })
        .catch(error => {
            res.status(500)
                .json(null);
        });

});

router.put('/', (req, res, next) => {
    const body = req.body;
    const sql = `update article
                 set title=?,
                     text=?,
                     update_date=current_timestamp()
                 where id = ?`;
    db.query(sql, [body.title, body.text, Number(body.id)])
        .then(([result]) => {
            res.json({status: 'success'})
        })
        .catch((error) => {
            res.status(500).json(null);
        });
});

router.post('/', (req, res, next) => {
    const body = req.body;
    const sql = `insert into article(title, text)
                 values (?, ?)`;
    db.query(sql, [body.title, body.text])
        .then(([result]) => {
            res.json({status: 'success'})
        })
        .catch((error) => {
            res.status(500).json(null);
        });
});

module.exports = router;
