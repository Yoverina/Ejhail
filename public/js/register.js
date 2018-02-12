
const database = firebase.database();
const auth = firebase.auth();
var userPass = '';
var userEmail;

// exports.userPass = userPass;
// exports.userEmail = userEmail;

auth.onAuthStateChanged(function(user) {
   if (user) {
     // User is signed in.
     var user = auth.currentUser;
     
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
         window.location.href = '/registration-success';
         window.alert("pass : " + userPass);
         
     }
    reset();     
   } else {
     // No user is signed in.
     window.alert("not logged in");
   }
 });

function reset(){
    
    document.getElementById("name").value = "";
    document.getElementById("nip").value = "";
    document.getElementById("division").value = "";
    document.getElementById("email").value = "";
    
    
}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.replace("login.html");
    }).catch(function(error) {
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
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
        window.alert("Error: " + errorMessage);
    });
    
}