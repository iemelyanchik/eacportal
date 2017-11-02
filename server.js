var express = require('express');
var app = express();
var nodemailer = require('nodemailer');

app.use(express.static(__dirname + '/'));

// views is directory for all template files
//app.set('views', __dirname + '/');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.post('/mail', function(request, response) {
    var transporter = nodemailer.createTransport({
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
    var mailOptions = {
        from: 'Ваш клиент', // sender address
        to: 'eacportal@eacportal.com', // list of receivers
        subject: 'Тест отправки', // Subject line
        text: 'Какой-то текст', // plain text body
        html: '<b>Посоны, не ссым, это бог программирования тестит</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
// Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
console.log('Press Ctrl+C to quit.');
});