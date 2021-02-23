const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const split = require('split');
const cors = require('cors');

const logger = winston.createLogger(require('./config/winston.config')(winston));
logger.info('test info');
logger.debug('test debug');

const app = express();
app.use(cors());

const winstonStream = split().on('data', function (line) {
    logger.http(line);
});

app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
    stream: winstonStream,
    skip: function (req, res) { return false }
}));
app.use(express.json());

// database
const db = require("./models");
db.init();

// routes
app.get('/', (req, res) => {
    res.send('Test');
});
require('./routes/auth.routes')(app);
require('./routes/account.routes')(app);
require('./routes/graphql.routes')(app);

module.exports = app;
