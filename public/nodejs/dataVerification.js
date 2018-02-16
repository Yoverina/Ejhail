var firebaseJS = require('./firebase');
json = {};

exports.showData = function(){
        var leadsRef = firebaseJS.database.ref('history').child('users').child('-L5T0PIXZWMeiu7OIgsh');
        leadsRef.on('value', function(snapshot) {
            //var date = snapshot.val().date;
            
            var leadsRef = firebaseJS.database.ref('user').child(snapshot.val().userID);
            leadsRef.on('value', function(userSnapshot)  {
                //var date = snapshot.val().date;
                    json = JSON.stringify({ 
                        date: snapshot.val().date, 
                        from: snapshot.val().from,
                        status: snapshot.val().status,
                        to: snapshot.val().to,
                        name: userSnapshot.val().nama,
                        nip: userSnapshot.val().nip,
                        program: userSnapshot.val().program
                    });
                    console.log(json);
                    
                    //return ('a');                
            });    
        });
        // return (json);
    };
    exports.json = json;
    // exports.getJson = function(){
    //     return callback(json);   
    // };

// var config = {
// 	apiKey: "AIzaSyD2ij-mxxh-EOGuP17x1FAgS3OJ5cB9Ous",
// 	authDomain: "ejhail-ajah.firebaseapp.com",
// 	databaseURL: "https://ejhail-ajah.firebaseio.com",
// 	projectId: "ejhail-ajah",
// 	storageBucket: "ejhail-ajah.appspot.com",
// 	messagingSenderId: "237361034617"
//   };

// firebase.initializeApp(config);
// const database = firebase.database();

//         var leadsRef = database.ref('history').child('users').child('-L5T0PIXZWMeiu7OIgsh');
//         leadsRef.on('value', function(snapshot) {
//             //var date = snapshot.val().date;
//                 document.getElementById('date').innerHTML = snapshot.val().date;
//                 document.getElementById('route').innerHTML = snapshot.val().from + ' - ' + snapshot.val().to;
//                 document.getElementById('status').innerHTML = snapshot.val().status;
           
//             var leadsRef = database.ref('user').child(snapshot.val().userID);
//             leadsRef.on('value', function(userSnapshot) {
//                 //var date = snapshot.val().date;
//                     document.getElementById('name').innerHTML = userSnapshot.val().nama;
//                     document.getElementById('nip').innerHTML = userSnapshot.val().nip;
//                     document.getElementById('division').innerHTML = userSnapshot.val().program;
                    
//             });     
//         });