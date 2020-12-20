const path = require('path');
require('winston-daily-rotate-file');
module.exports = function (winston) {
    const simpleFormat = winston.format.printf(({ level, message, label, timestamp }) => {
        return `${timestamp} [${level}]: ${message}`;
    });

    const fileTransport = new (winston.transports.DailyRotateFile)({
        frequency: null,
        filename: 'log-%DATE%',
        extension: '.log',
        dirname: path.join(__dirname, '..', '..', 'log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '2',

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
