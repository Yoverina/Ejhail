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


//buat nyari yg rutenya WSA-BLI
    // firebaseJS.database.ref('history').orderByChild('route').equalTo('WSA-BLI').once('value',function(snapshot){
    //     console.log(snapshot.val());
    // });
// console.log(isNaN('034567')); //false
    firebaseJS.database.ref('history').child(req.params.bookingID).once('value',function(snapshot){
       // console.log(snapshot.val());
        if(!snapshot.val()){
            res.send('Booking not found!');
        } else {
            if(snapshot.val().status == "Used") {
                res.send('Booking has been used');
            } else {
                var leadsRef = firebaseJS.database.ref('schedule').child(snapshot.val().route);
                leadsRef.once('value', function(routeSnapshot)  {
                    // console.log(snapshot.val().userID);
                    if(isNaN(snapshot.val().userID)){
                        var leadsRef = firebaseJS.database.ref('user').child(snapshot.val().userID);
                        leadsRef.once('value', function(userSnapshot)  {
                            json = ({ 
                                date: snapshot.val().date, 
                                origin: routeSnapshot.val().origin,
                                status: snapshot.val().status,
                                destination: routeSnapshot.val().destination,
                                ID: 'NIP',
                                name: userSnapshot.val().name,
                                nip: userSnapshot.val().nip,
                                program: userSnapshot.val().division
                            });
                            console.log('user punya');
                            res.render('passenger-data-verification.html', json);
                        });
                    } else {
                        var leadsRef = firebaseJS.database.ref('guest').child(snapshot.val().userID);
                        leadsRef.once('value', function(userSnapshot)  {
                            json = ({ 
                                date: snapshot.val().date, 
                                origin: routeSnapshot.val().origin,
                                status: snapshot.val().status,
                                destination: routeSnapshot.val().destination,
                                ID: 'ID Number',
                                name: userSnapshot.val().name,
                                nip: snapshot.val().userID,
                                program: userSnapshot.val().division
                            });
                            console.log('guest punya');
                            res.render('passenger-data-verification.html', json);
                        });
                    }
                });
                
                
            }
            // res.send('aa');
        }
    });
    


    // var bookingDataInUser = null;
    // var bookingDataInAdmin = null;
    // firebaseJS.database.ref('history/users').child(req.params.bookingID).once('value',function(snapshot){
    //     if(snapshot.val() == null){
    //         firebaseJS.database.ref('history/admin').child(req.params.bookingID).once('value',function(snapshot){
    //             if(snapshot.val() == null) {
    //                 console.log('not found!');
    //                 res.send('Data Not Found!');
    //             } else {
    //                 // res.send('admin booking');
    //                 if(snapshot.val().status == "Used") {
    //                     res.send('Booking has been used');
    //                 } else {
    //                     json = ({ 
    //                         date: snapshot.val().date, 
    //                         from: snapshot.val().from,
    //                         status: snapshot.val().status,
    //                         to: snapshot.val().to,
    //                         name: snapshot.val().name,
    //                         nip: snapshot.val().nip,
    //                         program: snapshot.val().division
    //                     });
    //                     res.render('passenger-data-verification.html', json);
    //                 }
    //             }
    //         });        
    //     } else {
    //         // res.send('user booking');
    //         if(snapshot.val().status == "Used") {
    //             res.send('Booking has been used');
    //         } else {
    //             var leadsRef = firebaseJS.database.ref('user').child(snapshot.val().userID);
    //             leadsRef.once('value', function(userSnapshot)  {
    //                 json = ({ 
    //                     date: snapshot.val().date, 
    //                     from: snapshot.val().from,
    //                     status: snapshot.val().status,
    //                     to: snapshot.val().to,
    //                     // name: userSnapshot.val().nama,
    //                     // nip: userSnapshot.val().nip,
    //                     // program: userSnapshot.val().program
    //                 });
    //                 res.render('passenger-data-verification.html', json);
    //             }); 
    //         }
    //     }
    // });
//batas
    // firebaseJS.database.ref('history/admin').child(req.params.bookingID).once('value',function(snapshot){
    //     bookingDataInAdmin = snapshot.val();
    //     console.log(bookingDataInAdmin);
    // });
    // console.log(bookingDataInUser + ' + ' + bookingDataInAdmin);
    // var leadsRef = firebaseJS.database.ref('history').child('users').child(req.params.bookingID);
    // leadsRef.once('value', function(snapshot) {
    //     if(snapshot.val() != null){
    //         if(snapshot.val().status == "Used") {
    //             res.send('Booking has been used');
    //         }
    //         else{
    //             // var leadsRef = firebaseJS.database.ref('user').child(snapshot.val().userID);
    //             // leadsRef.once('value', function(userSnapshot)  {
    //                 json = ({ 
    //                     date: snapshot.val().date, 
    //                     from: snapshot.val().from,
    //                     status: snapshot.val().status,
    //                     to: snapshot.val().to,
    //                     // name: userSnapshot.val().nama,
    //                     // nip: userSnapshot.val().nip,
    //                     // program: userSnapshot.val().program
    //                 });
    //                 res.render('passenger-data-verification.html', json);
    //             // }); 
    //         }   
    //     } else {
    //         console.log('not found!');
    //         res.send('Data Not Found!');
    //     }
    // });         
});

app.post('/verification/:bookingID/done', function(req, res){
    console.log('booking done');
    firebaseJS.database.ref('history').child(req.params.bookingID).update({
        status: "Used"
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