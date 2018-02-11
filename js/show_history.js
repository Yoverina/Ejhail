//coba ambil history dari database -> masukin ke history.html
var ref = database.ref('history/');
ref.on('value', gotData, errData);

//console.log(userId);

function gotData(snapshot){
	if (snapshot.val() == null) {return}
	//console.log(snapshot.val());
	var content = '';
	var history = snapshot.val();
	var keys = Object.keys(history);
	//console.log(keys);
	for (var i = 1; i <= keys.length; i++) {
		if (userId == history[keys[i-1]].userID) {
			content +='<tr>';
			content += '<td>' + history[keys[i-1]].date + '</td>';
			content += '<td>' + history[keys[i-1]].from + ' - ' + history[keys[i-1]].to +'</td>';
			content += '<td>' + '<div class="btn-group" role="group" aria-label="Basic example">'
							  +'<button type="button" class="btn btn-dark">Details</button>'
	                          +'<button type="button" class="btn btn-dark">Email</button>'
	                          +'<button type="button" class="btn btn-dark">Print</button>'
	                          +'<button type="button" class="btn btn-dark"  onclick="removeBooking('+"'"+keys[i-1]+"'"+')">Cancel</button>'
	                          +'</div>' + '</td>';
			content += '</tr>';
		}
		
	}
	$('#table').append(content);
}

function removeBooking(x){
	var deleteRef = database.ref('history/'+x);
	deleteRef.set(null);
}
