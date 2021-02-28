const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('./config/winston.config');
const moment = require('moment-timezone');

const initialize = () => {
    const simpleFormat = winston.format.printf(({ level, message, label, timestamp }) => {
        return `${moment(timestamp).tz(config.zone).format(config.format)} [${level}]: ${message}`;
    });

    const fileTransport = new (winston.transports.DailyRotateFile)({
        frequency: null,
        filename: config.fileName,
        extension: config.extension,
        dirname: config.dirname,
        datePattern: config.datePattern,
        zippedArchive: true,
        maxSize: config.maxSize,
        maxFiles: config.maxFiles,

        level: 'debug',
        format: winston.format.combine(
            winston.format.timestamp(),
            simpleFormat
        )
    });

    fileTransport.on('rotate', function(oldFilename, newFilename) {
        //TODO:
    });

    const transports = {
        console: new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                simpleFormat
            )
        }),
        file: fileTransport
    };

    return {
        transports: [
            transports.console,
            transports.file
        ]
    }
}

const transports = initialize().transports;
for (let key in transports) {
    winston.add(transports[key]);
}
module.exports = winston;
