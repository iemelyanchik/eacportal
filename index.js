const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));

// views is directory for all template files
app.set('views', __dirname + '/');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.post('/mail', function(request, response) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'eacportal@eacportal.com', // generated ethereal user
            pass: ',htcncrbq,ekmdfh8'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

// setup email data with unicode symbols
    let mailOptions = {
        from: '"Боженька" <info@gmail.com>', // sender address
        to: 'eacportal@eacportal.com', // list of receivers
        subject: 'Тест отправки', // Subject line
        text: 'Какой-то текст', // plain text body
        html: '<b>Посоны, не ссым, это бог программирования тестит</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
// Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
});



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
