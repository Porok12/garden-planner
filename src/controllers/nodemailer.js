const nodeMailer = require('nodemailer');
const config = require('../config/nodemailer.config');
const path = require('path');

const transport = nodeMailer.createTransport({
    host: config.host,
    port: config.port,
    auth: config.auth
});

module.exports.sendActivationCode = (sendToEmail) => {
    const token = Date.now().toString(36);
    const link = 'http://locolhost:3000/account/active/' + token;

    const mailOptions = {
        from: '"Garden Planner" <garden.planner@yandex.com>',
        to: sendToEmail,
        subject: 'Activation mail',
        text: 'Please open "' + link + '" to activate your account.',
        html: 'Please open <a href="' + link + '"> link </a> to activate your account. <br/> <img src="cid:logo"/>',
        attachments: [{
            filename: 'mail.svg',
            path: __dirname + '/mail.svg',
            cid: 'logo'
        }]
    };

    return new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error, mailOptions);
                reject(error);
            }

            console.log('Message sent: %s', info.messageId);
            resolve(info);
        });
    });
}

module.exports.sendResetPassword = (sendToEmail) => {
    const token = Date.now().toString(36);
    const link = 'http://locolhost:3000/reset2/' + token;

    const mailOptions = {
        from: '"Garden Planner" <garden.planner@yandex.com>',
        to: sendToEmail,
        subject: 'Reset your password',
        text: 'Please open "' + link + '" to reset your password.',
        html: 'Please open <a href="' + link + '"> link </a> to reset your password.',
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error, mailOptions);
        }

        console.log('Message sent: %s', info.messageId);
    });
}
