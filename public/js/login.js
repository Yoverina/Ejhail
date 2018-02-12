//const database = firebase.database();

function login() {
    var userEmail = document.getElementById("inputEmail").value;
    var userPass = document.getElementById("inputPassword").value;
    
    auth.signInWithEmailAndPassword(userEmail, userPass).then(function(user){
      if (user) {
     // User is signed in.
      //var user = auth.currentUser;
     console.log(user);
        if(user != null){
            var leadsRef = database.ref('user').child(user.uid);
            leadsRef.on('value', function(snapshot) {
                var userRole = snapshot.val().role;
                if(userRole == "Admin")
                    // window.location.replace("admin-dashboard.html");
                    window.location.href = '/admin-dashboard';
                else
                    // window.location.replace("booking.html");
                    window.location.href = '/booking';
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
}

