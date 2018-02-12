//coba ambil history dari database -> masukin ke history.html
var ref = database.ref('history/users/');
ref.on('value', gotData, errData);

var today = new Date();

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
			var date = new Date(history[keys[i-1]].date).getTime();
			//if(date.getMonth() > today.getMonth()) console.log('date: '+date.getMonth() + '>' + today.getMonth());
			//if(date > today.getTime()) console.log('date: '+date + '>' + today.getTime());
			content +='<tr>';
			content += '<td>' + history[keys[i-1]].date + '</td>';
			content += '<td>' + history[keys[i-1]].from + ' - ' + history[keys[i-1]].to +'</td>';
			content += '<td>' + history[keys[i-1]].status + '</td>';
			if(date < today.getTime()){
				content += '<td> - </td>';
			} else{
				content += '<td>' + '<div class="btn-group" role="group" aria-label="Basic example">'
		                          +'<button type="button" class="btn btn-dark"  onclick="removeBooking('+"'"+keys[i-1]+"'"+')">Cancel</button>'
		                          +'</div>' + '</td>';
			}
			content += '</tr>';
		}
		
	}
	$('#table').append(content);
}

function errData(err){
	console.log('Error!');
	console.log(err);
}

function removeBooking(x){
	var deleteRef = database.ref('history/users/'+x);
	deleteRef.set(null);
}
