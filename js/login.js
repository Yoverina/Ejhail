const database = firebase.database();
const auth = firebase.auth();

auth.onAuthStateChanged(function(user) {
   if (user) {
     // User is signed in.
       var user = auth.currentUser;
     
        if(user != null){
            var leadsRef = database.ref('user').child(user.uid);
            leadsRef.on('value', function(snapshot) {
                var userRole = snapshot.val().role;
                if(userRole == "Admin")
                    window.location.replace("admin-dashboard.html");
                else
                    window.location.replace("dashboard.html");
            });
        }
   } else {
     // No user is signed in.
     window.alert("not logged in");
   }
 });


function login() {
    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;
    
    auth.signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}