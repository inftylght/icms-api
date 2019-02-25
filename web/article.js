const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/list', (req, res, next) => {
    const query = {...req.query};
    const sqlParameter = [];

    let sql = `select * from article order by create_date desc`;

    if (query.limit) {
        sql += ' limit ?';
        sqlParameter.push(Number(query.limit));
    }

    db.query(sql, sqlParameter)
        .then(([results]) => {
            const articleList = [];
            for (const result of results) {
                articleList.push({
                    id: result.id,
                    title: result.title,
                    text: result.text? result.text.substr(0, 200): '',
                    titleEN: result.titleEN,
                    textEN: result.textEN? result.textEN.substr(0, 200): '',
                });
            }
            res.send(articleList);
        });
});
router.get('/:id', function(req, res, next) {
    const params = {...req.params};
    const sql = `select *
                from article
                where article.id=?`;
    db.query(sql, [Number(params.id)])
        .then(([results]) => {
            let article = null;
            for (const result of results) {
                article = {
                    id: result.id,
                    title: result.title,
                    text: result.text,
                    titleEN: result.titleEN,
                    textEN: result.textEN
                };
            }
            res.json(article);
        })
        .catch(error => {
            res.status(500)
                .json(null);
        });
});

module.exports = router;
