var firebaseJS = require('./firebase');
var nodemailer = require('nodemailer');


module.exports = {
    saveToDatabase: function(req, res){
        userEmail = req.body.email;
        userPass = req.body.pass;
        
        console.log(userEmail);
        
        firebaseJS.auth.createUserWithEmailAndPassword(userEmail, userPass).then(function(user){
            if (user) {
        // User is signed in.
        // var user = auth.currentUser;
        
        if(user != null){
            
            var userName = req.body.userName;
            var userNip = req.body.userNip;
            var userDiv = req.body.userDiv;
            
            firebaseJS.database.ref().child("user").child(user.uid).set({
                email: userEmail,
                nama: userName,
                nip: userNip,
                program: userDiv,
                role: "User"
            });
            
            
            console.log("pass : " + userPass);

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

            var mailOptions = {
                from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
                to: userEmail,
                subject: 'Data Login e-Shuttle',
                html: 	'Halo Aldo Novendi Fadly,' + '<br>' +
                        'Selamat datang di <b>BCA Learning Institute</b>,' + '<br>' +
                        'Berikut data login Anda untuk mengakses https://e-shuttle.com agar bisa memesan shuttle:' + '<br><br>' +
                        'email : ' + userEmail + '<br>' +
                        'password : ' + userPass + '<br><br>' +
                        'Terima kasih <br><br>Hormat kami, <br>BCA Learning Institute'
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
        reset();     
    } else {
        // No user is signed in.
    }

        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        });
    }
}