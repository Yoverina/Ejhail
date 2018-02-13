var firebaseJS = require('./firebase');

module.exports = {
    login: function(req, res){
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

    }
};