const index = require('nodemailer');
const config = require('../config/nodemailer.config');
const fs = require('fs');
const path = require('path');

const transport = index.createTransport({
    host: config.host,
    port: config.port,
    auth: config.auth
});

module.exports.sendActivationCode = (sendToEmail, token) => {
    const link = 'http://locolhost:3000/account/active/' + token;

    const htmlSignUp = fs.readFileSync(path.join(__dirname, 'signup.html'), 'utf-8')
        .split('%%LINK%%').join(link);

    const mailOptions = {
        from: '"Garden Planner" <garden.planner@yandex.com>',
        to: sendToEmail,
        subject: 'Activation mail',
        text: 'Please open "' + link + '" to activate your account.',
        html: htmlSignUp,
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

module.exports.sendResetPassword = (sendToEmail, token) => {
    const link = 'http://locolhost:3000/reset-password/' + token;

    const htmlResetPassword = fs.readFileSync(path.join(__dirname, 'resetpassword.html'), 'utf-8')
        .split('%%LINK%%').join(link);

    const mailOptions = {
        from: '"Garden Planner" <garden.planner@yandex.com>',
        to: sendToEmail,
        subject: 'Reset your password',
        text: 'Please open "' + link + '" to reset your password.',
        html: htmlResetPassword,
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error, mailOptions);
        }

        console.log('Message sent: %s', info.messageId);
    });
}
