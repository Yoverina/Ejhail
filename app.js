//import { userEmail, userPass } from './js/register';

var myHost = 'localhost:3000/';
var url = require('url');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cheerio = require('cheerio');
var location = require('location-href');
var firebaseJS = require('./public/nodejs/firebase');

var registerJS = require('./public/js/register.js');

var express = require('express');
var app = express();

var saveDataJS = require('./public/js/save_data');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({  //   body-parser to
    extended: true               //   parse data
}));                             //
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

var transporter = nodemailer.createTransport({
    service: 'gmail',
    // secure: false,
    // port: 465,
    
    auth: {
        user: 'shuttle.management.bca@gmail.com',
        pass: 'pedj04ng.Ejhail'
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

app.get('/registration-success', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    // alert(userEmail + ' + ' + userPass);
    renderHTML('./registration.html', res);
    //renderHTML('./public/html/registration.html', res);
    console.log(registerJS.userEmail);
});



app.get('/send', function(req, res){
    
    
    res.send("email");
})

app.post('/booking', function(req, res){
    // console.log(req);
    res.writeHead(200, {'Content-Type': 'text/html'});
    var path = url.parse(req.url).pathname;
    console.log("post req of booking");
	// console.log(data.key);
    renderHTML('./public/html/booking.html', res);
	// res.end("a");
	
	// var express = require('express');
	var $ = cheerio.load(fs.readFileSync('./public/html/booking.html'));
var data = {
	userID: '',
	from: '',
	to: '',
	date: ''
  } 
//   module.exports.data = data;
 //get html element & move input to variable -> booking.html
 //function saveToDatabase() {
 	var inpAsal = "";
  	var inpTujuan = "";
	var route = req.body.route;
	var tanggal = req.body.tanggal;
	// console.log(tanggal);
	  

 	if (route.selectedIndex == 1) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Wisma Asia";
 	} else if (route.selectedIndex == 2) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bogor";
 	} else if (route.selectedIndex == 3) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Alsut";
 	} else if (route.selectedIndex == 4) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Kelapa Gading";
 	} else if (route.selectedIndex == 5) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bekasi";
 	} else if (route.selectedIndex == 6) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Pondok Indah";
 	} else if (route.selectedIndex == 7) {
 		inpAsal = "Wisma Asia";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 8) {
 		inpAsal = "Bogor";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 9) {
 		inpAsal = "Alsut";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 10) {
 		inpAsal = "Kelapa Gading";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 11) {
 		inpAsal = "Bekasi";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 12) {
 		inpAsal = "Pondok Indah";
 		inpTujuan = "BCA Learning Institute";
 	}
	 
	 data.userID = firebaseJS.userId;
	 data.from = inpAsal;
	 data.to = inpTujuan;
	 data.date = tanggal;
	 var currBookingCode;
//reference database to specific tree -> history & push data to history
	var ref = firebaseJS.database.ref('history');
	ref.push(data);
	ref.limitToLast(1).on('child_added', function(data){
		console.log(data.key);
		currBookingCode = data.key;	
	});
	// window.alert("Successfully booking...");
//  }

 

    var mailOptions = {
        
        from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
        to: 'aldonovendi@gmail.com',
        subject: 'Data Login',
        html:   '<p> Tujukkan email ini ke petugas shuttle <p>' +
                '<img src = "https://chart.googleapis.com/chart?cht=qr&chl=' + myHost + currBookingCode + '&chs=180x180&choe=UTF-8&chld=L|2">',
        attachments: [{
            filename: 'image.png',
            path: 'https://chart.googleapis.com/chart?cht=qr&chl=' + myHost + currBookingCode + '&chs=180x180&choe=UTF-8&chld=L|2'
        }]
    };
    

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("Error woy!" + error);
        } else {
			console.log('Email sent: ' + info.response);
			transport.close();
        }
    });

    console.log("hello from me");
    // var id = firebaseJS.userId;
    //renderHTML('./public/html/'+ req.params.path +'.html', res);
});

app.post('/login', function(req, res){
	console.log('post login');
	var userEmail = req.body.userEmail;
	var userPass = req.body.userPass;
	
	console.log(userEmail+' ' +userPass);
	
    firebaseJS.auth.signInWithEmailAndPassword(userEmail, userPass).then(function(user){
      if (user) {
     // User is signed in.
      //var user = auth.currentUser;
    //  console.log(user);
        if(user != null){
			// console.log('user ada');
            var leadsRef = firebaseJS.database.ref('user').child(user.uid);
            leadsRef.on('value', function(snapshot) {
                var userRole = snapshot.val().role;
				if(userRole == "Admin"){
					// console.log('admin');
                    // window.location.replace("admin-dashboard.html");
					// location.set(myHost+'/admin-dashboard');
					res.send({redirect: '/admin-dashboard'});
				}
                else{
					// window.location.replace("booking.html");
					// console.log('user');
					// console.log(location());
					// location.set('localhost:3000/booking');
					res.send({redirect: '/booking'});
					
				}
            });
          }
     } else {
       // No user is signed in.
     }


    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
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

