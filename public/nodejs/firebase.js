var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
var firebaseClient = require('firebase');
var firebaseInit = firebase.initializeApp({
	apiKey: "AIzaSyD2ij-mxxh-EOGuP17x1FAgS3OJ5cB9Ous",
	authDomain: "ejhail-ajah.firebaseapp.com",
	databaseURL: "https://ejhail-ajah.firebaseio.com",
	projectId: "ejhail-ajah",
	storageBucket: "ejhail-ajah.appspot.com",
	messagingSenderId: "237361034617"
})

//get database
const database = firebase.database();
const auth = firebase.auth();
var userId;
var currUser;


exports.database = database;
exports.auth = auth;


// exports.userId = userId;
	// var user = data.val();
	// var keys = Object.keys(user);
	// //console.log(keys);
	// for (var i = 0; i < keys.length; i++) {
	// 	var k = keys[i];
	// 	var name = user[k].name;
	// 	var email = user[k].email;
	// 	//console.log(name,email);
	// }


function errData(err){
	console.log('Error!');
	console.log(err);
}

auth.onAuthStateChanged(function(user) {
  if (user) {
	// User is signed in.
	// console.log(auth.currentUser.email);
	console.log("onauthstatechanged called");
	if(currUser == null){
		currUser = auth.currentUser;
		exports.user = currUser;
	}
    // exports.userId = userId;
	console.log(currUser.uid);
  }
});


function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
		window.location.replace("login.html");
		currUser = null;
    }).catch(function(error) {
      // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });
}