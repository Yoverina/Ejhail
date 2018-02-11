
const database = firebase.database();
const auth = firebase.auth();
var userPass;
var userEmail;

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
    userEmail = document.getElementById("email").value;
    userPass = Math.random().toString(36).slice(-8);
    
    auth.createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
        window.alert("Error: " + errorMessage);
    });
    
}