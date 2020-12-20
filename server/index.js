// import express from 'express';
const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const split = require('split');

const logger = winston.createLogger(require('./src/config/winston.config')(winston));
logger.info('test info');
logger.debug('test debug');

const app = express();

const stream = {
    write: (text) => {
        logger.http(text)
    }
}

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
require('./src/routes/auth')(app);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
