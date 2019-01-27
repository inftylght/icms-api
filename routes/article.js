const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/list', (req, res, next) => {
    const sql = 'select article.id as id,' +
        ' article.title as title,' +
        ' content.type as type,' +
        ' content.content as content,' +
        ' content.order as `order`' +
        ' from article left join content on article.id=content.article_id' +
        ' order by article.id, content.order';
    db.query(sql)
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
            res.status(500);
        });
});

module.exports = router;
