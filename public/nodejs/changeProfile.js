var firebaseJS = require('./firebase');

module.exports = {
    changePass: function(req, res){
        
        console.log('changepass called');
        
        var user = firebaseJS.auth.currentUser;
        var newPassword = req.body.newPass;
        console.log('your new pass: ' + newPassword);
        user.updatePassword(newPassword).then(function() {
            console.log('password changed');
        }).catch(function(error) {
        // An error happened.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("chsngePass Failed : " + error);
        // ...
            // window.alert(errorMessage);
        
        });  
    },
    
    changeEmail: function(req, res){
    
        var user = firebaseJS.auth.currentUser;
        var newEmail = req.body.newEmail;
        var userPass = req.body.userPass;

        console.log(newEmail + ' -> ' + userPass);
    
        firebaseJS.auth.signInWithEmailAndPassword(user.email, userPass).then(function(user) {
            user.updateEmail(newEmail);
            firebase.database.ref().child("user").child(user.uid +"/email").set(newEmail);
        }).catch(function(error){
        //error
            var errorCode = error.code;
            var errorMessage = error.message;
        
            // window.alert("Error: " + errorMessage);
        });
    
    }
}