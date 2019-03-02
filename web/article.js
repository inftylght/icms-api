const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/list', async (req, res, next) => {
    try {
        const query = {...req.query};
        const sqlParameter = [];

        let sql = `select * from article order by create_date desc`;

        if (query.limit) {
            sql += ' limit ?';
            sqlParameter.push(Number(query.limit));
        }

        const articleListDB = await db.query(sql, sqlParameter);
        const results = articleListDB.results;

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
    } catch(error) {
        next(error);
    }
});
router.get('/:id', async function(req, res, next) {
    try {
        const params = {...req.params};
        const sql = `select *
                from article
                where article.id=?`;
        const articleDb = await db.query(sql, [Number(params.id)]);
        const results = articleDb.results;

        let article = null;
        for (const result of results) {
            article = {
                id: result.id,
                title: result.title,
                text: result.text,
                titleEN: result.titleEN,
                textEN: result.textEN,
                youtube: result.youtube
            };
        }
        res.json(article);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
