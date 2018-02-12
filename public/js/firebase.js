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

//get html element
//pindahin inputan ke variabel
 function saveToDatabase() {
 	var inpAsal = "";
  	var inpTujuan = "";
  	var route = document.getElementById("route");  	
  	var tanggal = document.getElementById("date").value;

 	if (route.selectedIndex == 1) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Wisma Asia";
 	}
 	if (route.selectedIndex == 2) {
 		inpAsal = "Wisma Asia";
 		inpTujuan = "BCA Learning Institute";
 	}

	var data = {
		userID: "-----",
		from: inpAsal,
		to: inpTujuan,
		date: tanggal,
		QRcode: "--qrcodeimage--"
  	}

//reference database to specific tree -> history & push data to history
	var ref = database.ref('history');
	ref.push(data);
 }


//coba ambil data dari database 
var ref1 = database.ref('user');
ref1.on('value', gotData, errData);

function gotData(data){
	if (data.val() == null) {return}
	//console.log(data.val());
	var user = data.val();
	var keys = Object.keys(user);
	//console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var name = user[k].name;
		var email = user[k].email;
		//console.log(name,email);
	}
}


function errData(err){
	console.log('Error!');
	console.log(err);
}

