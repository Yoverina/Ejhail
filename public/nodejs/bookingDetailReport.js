var firebaseJS = require('./firebase');

module.exports = {
    showDetail: function(req, res){
        firebaseJS.database.ref('history').orderByChild('route').equalTo(req.params.routeID).once('value',function(snapshot){
            console.log(snapshot.val());
            res.send(snapshot.val());
        });
    }
}