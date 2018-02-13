//import { userEmail, userPass } from './js/register';

var myHost = 'localhost:3000/';
module.exports.myHost = myHost;
var url = require('url');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cheerio = require('cheerio');
var location = require('location-href');
var firebaseJS = require('./public/nodejs/firebase');

var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));                             
app.use(bodyParser.json());

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

app.post('/booking', function(req, res){
    var bookingJS = require('./public/nodejs/booking');
    bookingJS.saveToDatabase(req,res);
});

app.post('/login', function(req, res){
    var loginJS = require('./public/nodejs/login');
    loginJS.login(req, res);
});

app.post('/registration', function(req, res){
    var registerJS = require('./public/nodejs/register');
    registerJS.saveToDatabase(req, res);
});

app.get('/', function(req, res){
	res.redirect('/login');
});

app.get('/verfication/:bookingID', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    renderHTML('./public/html/passenger-data-verification.html', res);
});

app.get('/:path',function(req,res){   
	console.log(firebaseJS.userId);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    renderHTML('./public/html/'+ req.params.path +'.html', res);
});