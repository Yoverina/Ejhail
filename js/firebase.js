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
//  console.log(firebase);
//-----------------------------------------------------------

//get database
  var database = firebase.database();

//get html element
  var iname = document.getElementById("nama");
  var iuser = document.getElementById("uname");
  var iemail = document.getElementById("email");
  var ipass = document.getElementById("pass");
  var e = document.getElementById("agama");
  var iasal;
  var gender;

 //  var radios = document.getElementsByName('gender');
 //  console.log(radios[0].value);
	// for (var i = 0; i < radios.length; i++)
	// {
	//  if (radios[i].checked)
	//  {
	//  	gender = radios[i].value;
	//  }
	// }
	// var desc = document.getElementById("description");

//pindahin inputan ke variabel
 function saveData() {
	iname = iname.value;
	iuser = iuser.value;
	iemail = iemail.value;
	ipass = ipass.value;
	iasal = e.options[e.selectedIndex].value;
	if (document.getElementById('laki').checked) {
		gender = "Laki laki"
	} else if (document.getElementById('perempuan').checked) {
		gender = "perempuan"
	}


	// desc = document.getElementById("description").text;

	var data = {
		name: iname,
		username: iuser,
		email: iemail,
		password: ipass,
		agama: iasal,
		gender: gender
  	}

//reference database to specific tree -> user & push data to user
	var ref = database.ref('user');
	ref.push(data);
 }
 
var ref1 = database.ref('user');
ref1.on('value', gotData, errData);

//coba ambil data dari database
function gotData(data){
	console.log(data.val());
	var user = data.val();
	var keys = Object.keys(user);
	console.log(keys);
	for (var i = 0; i < keys.length; i++) {
		var k = keys[i];
		var name = user[k].name;
		var email = user[k].email;
		console.log(name,email);
	}
}

function errData(err){
	console.log('Error!');
	console.log(err);
}