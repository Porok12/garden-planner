// import express from 'express';
const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const split = require('split');
const cors = require('cors');

const logger = winston.createLogger(require('./src/config/winston.config')(winston));
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

const db = require("./src/models");
db.initial();

app.get('/', (req, res) => {
    res.send('Test');
});

// routes
require('./src/routes/auth.routes')(app);
require('./src/routes/account.routes')(app);
require('./src/routes/graphql.routes')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
