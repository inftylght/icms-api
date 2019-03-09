const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = router;

router.get('/configMap', async (req, res, next) => {
   try {
       let configRes = null;
       const sql = `select * from config`;
       const configQuery = await db.query(sql);
       const results = configQuery.results;
       if (results.length>0) {
           configRes = results.reduce((map, object) => {
               map[object.key] = object.value;
               return map;
           }, {});
       }
       res.send(configRes);
   } catch (error) {
       next(error);
   }
});

router.put('/', async (req, res, next) => {
    try {
        const body = req.body;
        for (const configKey in body) {
            if (body.hasOwnProperty(configKey)) {
                const sql = `update config
                            set \`value\`=?
                            where \`key\`=?`;
                await db.query(sql, [body[configKey], configKey]);
            }
        }
        res.send({status: 'success'});
    } catch (error) {
        next(error);
    }
});
