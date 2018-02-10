// Initialize Firebase
  var config = {
	apiKey: "AIzaSyD2ij-mxxh-EOGuP17x1FAgS3OJ5cB9Ous",
	authDomain: "ejhail-ajah.firebaseapp.com",
	databaseURL: "https://ejhail-ajah.firebaseio.com",
	projectId: "ejhail-ajah",
	storageBucket: "ejhail-ajah.appspot.com",
	messagingSenderId: "237361034617"
  };
  firebase.initializeApp(config);

//get database
var database = firebase.database();

 


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
