const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
const split = require('split');
const cors = require('cors');

const logger = winston.createLogger(require('./config/winston.config')(winston));
logger.info('test info');
logger.debug('test debug');

const winstonStream = split().on('data', (line) => {
    logger.http(line);
});

function createApp() {
    const app = express();

    // middlewares
    app.use(cors());
    app.use(express.json());
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
        stream: winstonStream,
        skip: (req, res) => { return false }
    }));

    // routes
    app.get('/', (req, res) => {
        res.send('Test');
    });
    require('./routes/auth.routes')(app);
    require('./routes/account.routes')(app);
    require('./routes/graphql.routes')(app);
    return app
}

module.exports = createApp;
