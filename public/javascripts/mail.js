/**
 * Created by lt-117 on 1/6/16.
 */
var nodemailer = require('nodemailer');
var promise = require('bluebird');


// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport('smtps://desaiamey2@gmail.com:Amey@26Desai@smtp.gmail.com');

// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"Amey Desai" <desaiamey2@gmail.com>', // sender address
    to: 'amey.desai@tudip.nl', // list of receivers
    subject: 'Node mail', // Subject line
    text: 'Hi from node', // plaintext body
    html: '<b>Hi from node</b>' // html body
};

// send mail with defined transport object 



var sendMail = function () {
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(' --- error --- ', error);
                return reject(error);
            } else {
                console.log('Message sent: ' + info.response);
                return resolve(info.response);

            }
        });
    });
    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log('Message sent: ' + info.response);
    // });
};

module.exports = sendMail;