const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/list', async (req, res, next) => {
    try {
        const sql = `select *
                     from article`;
        const articleDb = await db.query(sql);
        const results = articleDb.results;

        const articleList = [];
        for (const result of results) {
            articleList.push({
                id: result.id,
                title: result.title ? result.title.substr(0, 200) : '',
                titleEN: result.titleEN ? result.titleEN.substr(0, 200) : ''
            });
        }
        res.send(articleList);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const params = {...req.params};
        const sql = `select *
                     from article
                     where article.id = ?`;
        const articleQuery = await db.query(sql, [Number(params.id)]);
        const results = articleQuery.results;

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

router.put('/', (req, res, next) => {
    try {
        const body = req.body;
        const sql = `update article
                     set title=?,
                         text=?,
                         titleEN=?,
                         textEN=?,
                         youtube=?,
                         update_date=current_timestamp()
                     where id = ?`;
        const articleQuery = db.query(sql,
            [body.title, body.text, body.titleEN, body.textEN, body.youtube, Number(body.id)]);

        res.json({status: 'success'});
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const sql = `insert into article(title, text, titleEN, textEN, youtube)
                 values (?, ?, ?, ?, ?)`;
        await db.query(sql, [body.title, body.text, body.titleEN, body.textEN, body.youtube])
        res.json({status: 'success'});
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const params = {...req.params};
        const sql = `delete
                 from article
                 where id = ?`;
        await db.query(sql, [Number(params.id)])
        res.json({status: 'success'});
    } catch (error) {
        next(error)
    }
});

module.exports = router;
