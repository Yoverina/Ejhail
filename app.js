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
// app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, function(req, res){
    console.log("Start on 3000");    
})

var http = require('http');

function renderHTML(path, response){
    fs.readFile(path, null, function(error, data){
        if(error){
            // response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
            // response.write('aa');
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

app.post('/change-pass', function(req, res){
    var changeProfileJS = require('./public/nodejs/changeProfile');
    console.log('post changepass');
    changeProfileJS.changePass(req, res);
});

app.post('/change-mail', function(req, res){
    var changeProfileJS = require('./public/nodejs/changeProfile');
    console.log('post changemail');
    changeProfileJS.changeEmail(req, res);
});

var engine = require('consolidate');
app.set('views', __dirname + '/public/html');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

app.get('/verification/:bookingID', function(req, res){
    var dataVerificationJS = require('./public/nodejs/dataVerification');
    var json = {};
    // if(firebaseJS.database.ref('history').child('users').child(req.params.bookingID) == null){
    //     res.send('Not found');
    // }
    var leadsRef = firebaseJS.database.ref('history').child('users').child(req.params.bookingID);
    leadsRef.on('value', function(snapshot) {
        if(snapshot.val() != null){
            var leadsRef = firebaseJS.database.ref('user').child(snapshot.val().userID);
            leadsRef.on('value', function(userSnapshot)  {
                json = ({ 
                    date: snapshot.val().date, 
                    from: snapshot.val().from,
                    status: snapshot.val().status,
                    to: snapshot.val().to,
                    name: userSnapshot.val().nama,
                    nip: userSnapshot.val().nip,
                    program: userSnapshot.val().program
                });
                res.render('passenger-data-verification.html', json);
            });    
        } else {
            res.send('Data Not Found!');
        }
        
    });          
});

app.get('/verification/:bookingID/done', function(req, res){
    console.log('done');
    var leadsRef = firebaseJS.database.ref('history').child('users').child(req.params.bookingID);
    leadsRef.on('value', function(snapshot) {
        leadsRef.update({ status: "Used" })
    });          
}); 

app.get('/', function(req, res){
	res.redirect('/login');
});

app.get('/:path',function(req,res){   
	console.log(firebaseJS.userId);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    renderHTML('./public/html/'+ req.params.path +'.html', res);
});