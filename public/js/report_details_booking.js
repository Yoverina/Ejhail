var historyRef = database.ref('history/');
historyRef.on('child_added', snap =>{
	var dest = localStorage.getItem('dest');
	var src = localStorage.getItem('src');
	var time = localStorage.getItem('time');
	console.log(time);
	if (snap.val() == null) {return}
	var content = '';
	var historyValue = snap.val();
	if(historyValue.from != src || historyValue.to != dest || new Date(historyValue.date).getMonth() != new Date(time).getMonth()) {
		return;
	}
	content +='<tr>';
	content += '<td>' + historyValue.date + '</td>';
	var userRef = database.ref('user/'+historyValue.userID);
	console.log(historyValue.userID);
	userRef.on('value', userSnap =>{
		var userValue = userSnap.val();
		content += '<td>' + userValue.name + '</td>';
		content += '<td>' + userValue.division + '</td>';
		panggilinSisanya(content, historyValue);
	});

});

var historyAdminRef = database.ref('history/admin/');
historyAdminRef.on('child_added', snap =>{
	if (snap.val() == null) {return}
	var dest = localStorage.getItem('dest');
	var time = localStorage.getItem('time');
	var src = localStorage.getItem('src');
	var content = '';
	var historyValue = snap.val();
	if(historyValue.from != src || historyValue.to != dest || new Date(historyValue.date).getMonth() != new Date(time).getMonth()) {
		return;
	}
	content +='<tr>';
	content += '<td>' + historyValue.date + '</td>';
	var userRef = database.ref('guest/'+historyValue.userID);
	console.log(historyValue.userID);
	userRef.on('value', userSnap =>{
		var userValue = userSnap.val();
		content += '<td>' + userValue.name + '</td>';
		content += '<td>' + userValue.division + '</td>';
		panggilinSisanya(content, historyValue);
	});
});

function changeRoute(){
	var dest = localStorage.getItem('dest');
	var src = localStorage.getItem('src');
	var time = localStorage.getItem('time');

	document.getElementById('route').innerText = src + " - " + dest;
	document.getElementById('time').innerText = time;
}

function panggilinSisanya(content, historyValue){
	//bacause javascript is async
	content += '<td>' + historyValue.from + '</td>';
	content += '<td>' + historyValue.to + '</td>';
	content += '<td>' + historyValue.status + '</td>';
	content += '<td>User</td>';
	content += '</tr>';
	var a = $('#table-user');
	a.append(content);
}
	