//import { userEmail, userPass } from './js/register';

var url = require('url');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var registerJS = require('./public/js/register.js');

var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var app = require('./public/js/register.js');
app.use('/public', express.static(path.join(__dirname + '/public')));
app.listen(3000, function(req, res){
    console.log("Start on 3000");    
})

var http = require('http');

function renderHTML(path, response){
    fs.readFile(path, null, function(error, data){
        if(error){
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

app.get('/registration-success', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    // alert(userEmail + ' + ' + userPass);
    renderHTML('./registration.html', res);
    //renderHTML('./public/html/registration.html', res);
    console.log(registerJS.userEmail);
});
// var firebaseJS = require('./public/js/firebase.js');
app.post('/booking', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    console.log("post req of booking");

    renderHTML('./public/html/booking.html', res);
    // res.end("a");
        
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
    
        auth: {
            user: 'shuttle.management.bca@gmail.com',
            pass: 'pedj04ng.Ejhail'
        },
        tls: {
            rejectUnauthorized: false
            // secureProtocol: "TLSv1_method"
        }
    });

    var mailOptions = {
            from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
            to: 'aldonovendi@gmail.com',
            subject: 'Data Login',
            html: 'haha<img src="' + 'a' +'">'
    };
        
    transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log("Error woy!"+error);
            } else {
                console.log('Email sent: ' + info.response);
            }
    });
    console.log("hello from me");
    // var id = firebaseJS.userId;
    //renderHTML('./public/html/'+ req.params.path +'.html', res);
});

app.get('/:path',function(req,res){   
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    renderHTML('./public/html/'+ req.params.path +'.html', res);
});



// var handleRequest = function(req, res){
//     res.writeHead(200, {'content type': 'text/html'});

//     var path = url.parse(req.url).pathname;
//     switch(path){
//         case '/':
//             renderHTML('./registration.html', res);
//             break;
//     }
// }


// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'});

//     var path = url.parse(req.url).pathname;
//     switch(path){
//         case '/':
//             renderHTML('./registration.html', res);
//             break;
//     }
// }).listen(8000);

