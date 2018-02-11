 //get html element & move input to variable -> booking.html

 function saveToDatabase() {
 	var inpAsal = "";
  	var inpTujuan = "";
  	var route = document.getElementById("route");  	
  	var tanggal = document.getElementById("date").value;

 	if (route.selectedIndex == 1) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Wisma Asia";
 	} else if (route.selectedIndex == 2) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bogor";
 	} else if (route.selectedIndex == 3) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Alsut";
 	} else if (route.selectedIndex == 4) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Kelapa Gading";
 	} else if (route.selectedIndex == 5) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Bekasi";
 	} else if (route.selectedIndex == 6) {
 		inpAsal = "BCA Learning Institute";
 		inpTujuan = "Pondok Indah";
 	} else if (route.selectedIndex == 7) {
 		inpAsal = "Wisma Asia";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 8) {
 		inpAsal = "Bogor";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 9) {
 		inpAsal = "Alsut";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 10) {
 		inpAsal = "Kelapa Gading";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 11) {
 		inpAsal = "Bekasi";
 		inpTujuan = "BCA Learning Institute";
 	} else if (route.selectedIndex == 12) {
 		inpAsal = "Pondok Indah";
 		inpTujuan = "BCA Learning Institute";
 	}
 	
	var data = {
		userID: "-----",
		from: inpAsal,
		to: inpTujuan,
		date: tanggal
  	}

//reference database to specific tree -> history & push data to history
	var ref = database.ref('history');
	ref.push(data);
 }