const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const articleRouter = require('./routes/article');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/article', articleRouter);


app.listen(8080)

process.on('uncaughtException', function(err) {
  console.log( "UNCAUGHT EXCEPTION" + err.stack || err.message );
});

module.exports = app;
