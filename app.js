//import { userEmail, userPass } from './js/register';

var url = require('url');
var fs = require('fs');
var path = require('path');

var registerJS = require('./public/js/register.js');

var express = require('express');
var app = express();

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

app.get('/:path',function(req,res){   
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    //renderHTML('./'+ req.params.path +'.html', res);
    renderHTML('./public/html/'+ req.params.path +'.html', res);
    // res.sendFile('registration.html');
    // res.sendFile(path.join(__dirname + '/registration.html'));
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

