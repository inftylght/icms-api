const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/list', (req, res, next) => {
    const query = {...req.query};
    const sqlParameter = [];

    let sql = `select article.id      as id,
                       article.title   as title,
                       content.type    as type,
                       content.content as content,
                       content.order   as \`order\`
                from article
                       left join content on article.id = content.article_id
                order by  article.create_date desc, article.id, content.order`;

    if (query.limit) {
        sql += ' limit ?';
        sqlParameter.push(Number(query.limit));
    }

    db.query(sql, sqlParameter)
        .then(([results, fields]) => {
            const articleList = [];
            for (const result of results) {
                let article = articleList.find((data) => {
                    return data.id === result.id;
                });
                const contentRes = {
                    type: result.type,
                    content: result.content
                };
                if (article) {
                    article.contents.push(contentRes);
                } else {
                    articleList.push({
                        id: result.id,
                        title: result.title,
                        contents: [
                            contentRes
                        ]
                    });
                }
            }
            res.json(articleList);
        })
        .catch(error => {
            res.status(500).json(null);
        });
});
router.get('/:id', function(req, res, next) {
    const parameters = {...req.params};
    const sql = `select article.id      as id,
                       article.title   as title,
                       content.type    as type,
                       content.content as content,
                       content.order   as \`order\`
                from article
                       left join content on article.id = content.article_id
                where article.id=?
                order by content.order`;
    db.query(sql, [parameters.id])
        .then(([results]) => {
            let article = null;
            for (const result of results) {
                if (article === null) {
                    article = {
                        title: result.title,
                        contents: []
                    };
                }
                article.contents.push({
                    type: result.type,
                    content: result.content
                });
            }
            res.json(article);
        })
        .catch(error => {
            res.status(500).json(null);
        });
});

module.exports = router;
