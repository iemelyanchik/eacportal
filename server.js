const express = require('express');
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');
const bodyparser = require('body-parser');

const app = express();

app.use(fileUpload());

app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.post('/uploads', function(req, res) {
    console.log(req.files.file);

    let mailOptions = {
        from: req.body.fio + '<'+req.body.email+'>', // sender address '"Fred Foo 👻" <foo@blurdybloop.com>'
        to: 'eacportal@eacportal.com', // list of receivers
        subject: 'Хотим просчитать', // Subject line
        text: req.body.description, // plain text body
        html: '<b>Компания: '+req.body.company+'</b><br>' + '<p>Наименование: '+ req.body.title +'</ p><br>' +
        '<p>Краткое описание: '+ req.body.description +'</ p><br>' +
        '<p>ТН ВЭД: '+req.body.tn_ved+'</p><br>' + '<p>ФИО: '+req.body.fio+'</p>' +
        '<p>Номер телефона: '+req.body.phone+'</p>'+
        '<p>E-MAIL: '+req.body.email+'</p>' // html body
    };

    if(req.files.file){
        mailOptions.attachments = [{
            filename: req.files.file.name,
            path : 'uploads/'+ req.files.file.name,
            contentType: 'base64'
        }];

        let sampleFile = req.files.file;
        sampleFile.mv('./uploads/' + req.files.file.name, function (err) {
            if (err)
                return res.status(500).send(err);

            res.send('file uploaded!');
        });
    } else {
        res.send('no file');
    }

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





//callback router
app.post('/callback', function(req, res) {

console.log(req);
    let mailOptions = {
        from: req.body.call_name, // sender address '"Fred Foo 👻" <foo@blurdybloop.com>'
        to: 'eacportal@eacportal.com', // list of receivers
        subject: 'Обратный звонок', // Subject line
        // text: req.body.description, // plain text body
        html: '<b>Имя: '+req.body.call_name+'</b><br>' +
        '<p>Номер телефона: '+ req.body.call_phone// html body
    };

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

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.send('ok');
});




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});