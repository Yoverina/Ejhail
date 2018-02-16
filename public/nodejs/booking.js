//console.log(req);
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // var path = url.parse(req.url).pathname;
    // console.log("post req of booking");
    // renderHTML('./public/html/booking.html', res);
	// res.end("a");
	
    // var express = require('express');
    
var firebaseJS = require('./firebase');
var app = require('../../app');
var nodemailer = require('nodemailer');

module.exports = {
saveToDatabase: function(req, res){
    var data = {
	userID: '',
	from: '',
	to: '',
	date: '',
	status: ''
  } 
//   module.exports.data = data;
 //get html element & move input to variable -> booking.html
 //function saveToDatabase() {
 	var inpAsal = "";
  	var inpTujuan = "";
	var route = req.body.route;
	var tanggal = req.body.tanggal;
	// console.log(tanggal);
	console.log('route: ' + route);

 	if (route == 1) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Wisma Asia";
 	} else if (route == 2) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bogor";
 	} else if (route == 3) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Alsut";
 	} else if (route == 4) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Kelapa Gading";
 	} else if (route == 5) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bekasi";
 	} else if (route == 6) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Pondok Indah";
 	} else if (route == 7) {
 		inpAsal = "Wisma Asia";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route == 8) {
 		inpAsal = "Bogor";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route == 9) {
 		inpAsal = "Alsut";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route == 10) {
 		inpAsal = "Kelapa Gading";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route == 11) {
 		inpAsal = "Bekasi";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route == 12) {
 		inpAsal = "Pondok Indah";
 		inpTujuan = "BCA Learning Institute";
 	}
	 
	 data.userID = firebaseJS.userId;
	 data.from = inpAsal;
	 data.to = inpTujuan;
	 data.date = tanggal;
	 data.status = "Not Used";
	 var currBookingCode;
//reference database to specific tree -> history & push data to history
	var ref = firebaseJS.database.ref('history/users');
	ref.push(data);
	ref.limitToLast(1).on('child_added', function(data){
		console.log(data.key);
		currBookingCode = data.key;	
	}); 


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
	
	var name = '';

	var leadsRef = firebaseJS.database.ref('user').child(firebaseJS.userId);
	leadsRef.on('value', function(snapshot) {
		name = snapshot.val().nama;
	});

    var mailOptions = {
        
        from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
        to: firebaseJS.auth.currentUser.email,
        subject: 'Verifikasi Data Penumpang',
		html:   'Halo ' + name + ',' + '<br>' +
				'Terima kasih sudah menggunakan layanan e-Shuttle.<br>' +
				'Silakan tunjukkan email berikut kepada petugas shuttle.' + '<br>' + 
				'Berikut data pemesanan Anda:' + '<br><br>' +
				'Rute : ' + inpAsal + ' - ' + inpTujuan + '<br>' +
				'Tanggal Berangkat : ' + tanggal + '<br><br>' +
				'<img src = "https://chart.googleapis.com/chart?cht=qr&chl=' + app.myHost + 'verification/' + currBookingCode + '&chs=180x180&choe=UTF-8&chld=L|2"> <br><br>' +		
				'Terima kasih <br><br>Hormat kami, <br>BCA Learning Institute',
                
        attachments: [{
            filename: 'image.png',
            path: 'https://chart.googleapis.com/chart?cht=qr&chl=' + app.myHost + currBookingCode + '&chs=180x180&choe=UTF-8&chld=L|2'
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
}
}