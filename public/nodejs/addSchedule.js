var firebaseJS = require('./firebase');

module.exports = {
    addScheduleToFirebase: function(req, res){
        console.log('post add schedule');
        // console.log(req.body);
        var dest = req.body.dest;
        var org = req.body.org;
        var dept = req.body.dept;
        // console.log(dest + ' ' +org);

        firebaseJS.database.ref('schedule').push({
            destination: dest,
            origin: org,
            departure: dept
        });
    }
}