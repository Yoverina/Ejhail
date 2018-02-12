var ref = database.ref('user');

function editProfile(){
 	var name = document.getElementById("name").value;
 	var nip = document.getElementById("nip").value;
 	var division = document.getElementById("division").value;

 	var data = {
		nama: name,
		nip: nip,
		program: division
  	}
  	ref.child(userId).update(data);
  	window.alert("Successfully edit profile...")
}