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
        var historyData = {
            userID: '',
            route: '',
            date: '',
            status: ''
        }
        var guestData = {
            name: '',
            email: '',
            division: ''
        }
        
        historyData.userID = req.body.guestID;
        historyData.route = req.body.route;
        historyData.date = req.body.date;
        historyData.status = "Not Used";
        
        guestData.division = req.body.division;
        guestData.email = req.body.email;
        guestData.name = req.body.name;

        var currBookingCode = firebaseJS.database.ref('history').push(historyData).key;
        firebaseJS.database.ref('guest').child(historyData.userID).set(guestData);
        // ref.limitToLast(1).on('child_added', function(data){
        //     console.log(data.key);
        //     currBookingCode = data.key;	
        // });         
        
        var dest = '';
        var org = '';

        var leadsRef = firebaseJS.database.ref('schedule').child(historyData.route);
        leadsRef.on('value', function(snapshot) {
            dest = snapshot.val().destination;
            org = snapshot.val().origin;
            var transporter = nodemailer.createTransport({
                service: 'gmail',                
                auth: {
                    user: 'shuttle.management.bca@gmail.com',
                    pass: 'pedj04ng.Ejhail'
                },
            });
            
            var mailOptions = {        
                from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
                to: guestData.email,
                subject: 'Verifikasi Data Penumpang',
                html:   'Halo ' + guestData.name + ',' + '<br>' +
                        'Terima kasih sudah menggunakan layanan e-Shuttle.<br>' +
                        'Silakan tunjukkan email berikut kepada petugas shuttle.' + '<br>' + 
                        'Berikut data pemesanan Anda:' + '<br><br>' +
                        'Rute : ' + org + ' - ' + dest + '<br>' +
                        'Tanggal Berangkat : ' + historyData.date + '<br><br>' +
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
        });

        
    }
}