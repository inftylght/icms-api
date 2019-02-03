const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config');

const webRouter = require('./web/router');
const adminRouter = require('./admin/router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/web', webRouter);
app.use('/admin', adminRouter);


app.listen(config.host.port, function() {
  console.log(`running at http://localhost:${config.host.port}`)
});

process.on('uncaughtException', function(err) {
  console.log( "UNCAUGHT EXCEPTION" + err.stack || err.message );
});

module.exports = app;
