const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compress = require('compression');
const config = require('./config');

const webRouter = require('./web/router');
const adminRouter = require('./admin/router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(compress());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/web', webRouter);
app.use('/admin', adminRouter);
app.use('/', (req, res, next) => {
  res.status(404).send();
});
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send();
});


app.listen(config.host.port, function() {
  console.log(`running at http://localhost:${config.host.port}`)
});

process.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
});
process.on('uncaughtException', function(err) {
  console.error( "UNCAUGHT EXCEPTION" + err.stack || err.message );
  process.exit(1);
});

module.exports = app;
