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
                    title: result.title? result.title.substr(0, 200): '',
                    titleEN: result.titleEN? result.titleEN.substr(0, 200): ''
                });
            }
            res.send(articleList);
        });
});

router.get('/:id', (req, res, next) => {
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

router.put('/', (req, res, next) => {
    const body = req.body;
    const sql = `update article
                 set title=?,
                     text=?,
                     titleEN=?,
                     textEN=?,
                     update_date=current_timestamp()
                 where id = ?`;
    db.query(sql, [body.title, body.text, body.titleEN, body.textEN, Number(body.id)])
        .then(([result]) => {
            res.json({status: 'success'})
        })
        .catch((error) => {
            res.status(500).json(null);
        });
});

router.post('/', (req, res, next) => {
    const body = req.body;
    const sql = `insert into article(title, text, titleEN, textEN)
                 values (?, ?, ?, ?)`;
    db.query(sql, [body.title, body.text, body.titleEN, body.textEN])
        .then(([result]) => {
            res.json({status: 'success'})
        })
        .catch((error) => {
            res.status(500).json(null);
        });
});

router.delete('/:id', (req, res, next) => {
    const params = {...req.params};
    const sql = `delete from article where id=?`;
    db.query(sql, [Number(params.id)])
        .then(([result]) => {
            res.json({status: 'success'})
        })
        .catch((error) => {
            res.status(500).json(null);
        });
});

module.exports = router;
