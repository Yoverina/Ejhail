<<<<<<< HEAD:public/js/register.js

const database = firebase.database();
const auth = firebase.auth();
var userPass = '';
var userEmail;

// exports.userPass = userPass;
// exports.userEmail = userEmail;

auth.onAuthStateChanged(function(user) {
   if (user) {
=======
var userPass;
var userEmail;

exports.userPass = userPass;
exports.userEmail = userEmail;

function reset(){
    
    document.getElementById("name").value = "";
    document.getElementById("nip").value = "";
    document.getElementById("division").value = "";
    document.getElementById("email").value = "";
    
    
}

function register() {
    userEmail = document.getElementById("email").value;
    userPass = Math.random().toString(36).slice(-8);
    
    auth.createUserWithEmailAndPassword(userEmail, userPass).then(function(user){
        if (user) {
>>>>>>> backend:public/js/register.js
     // User is signed in.
    // var user = auth.currentUser;
     
     if(user != null){
         
         var userName = document.getElementById("name").value;
         var userNip = document.getElementById("nip").value;
         var userDiv = document.getElementById("division").value;
         
         database.ref().child("user").child(user.uid).set({
             email: userEmail,
             nama: userName,
             nip: userNip,
             program: userDiv,
             role: "User"
         });
<<<<<<< HEAD:public/js/register.js
=======
         
>>>>>>> backend:public/js/register.js
         window.location.href = '/registration-success';
         window.alert("pass : " + userPass);
         
     }
    reset();     
   } else {
     // No user is signed in.
   }

    }).catch(function(error) {
<<<<<<< HEAD:public/js/register.js
      // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });
}

function register() {
    // alert("aaa");
    
    userEmail = document.getElementById("email").value;
    userPass = Math.random().toString(36).slice(-8);
    /*var nodemailer = require('nodemailer');
    
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
        }
    });

    var mailOptions = {
        from: '"Shuttle Account" <shuttle.management.bca@gmail.com>',
        to: 'aldonovendi@gmail.com',
        subject: 'Testing',
        text: userPass,
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });*/
    
    auth.createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
=======
>>>>>>> backend:public/js/register.js
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
        window.alert("Error: " + errorMessage);
    });
    
}