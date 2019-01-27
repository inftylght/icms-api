var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', (req, res, next) => {
  const articleList = [
    {
      id:1,
      title: "หัวข้อ 1",
      contents: [
        {
          type: 'title',
          content: 'ทดสอบ content 1'
        }
      ]
    },
    {
      id:2,
      title: "หัวข้อ 2",
      contents: [
        {
          type: 'title',
          content: 'ทดสอบ content 2'
        }
      ]
    },
    {
      id:3,
      title: "หัวข้อ 3",
      contents: [
        {
          type: 'title',
          content: 'ทดสอบ content 3'
        }
      ]
    }
  ]
  res.json(articleList);
})

module.exports = router;
