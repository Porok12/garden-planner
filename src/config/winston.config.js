const path = require('path');

module.exports = {
    zone: 'Europe/Warsaw',
    format: 'YYYY/MM/DD HH:mm:ss z',

    fileName: 'log-%DATE%',
    extension: '.log',
    dirname: path.join(__dirname, '..', '..', 'log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '10m',
    maxFiles: '2'
}

