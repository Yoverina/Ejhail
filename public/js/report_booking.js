    function storeData(ind){
            var btn = document.getElementsByClassName('details');
            var dest = btn[ind].parentNode.parentNode.parentNode.cells[1];
            var time = btn[ind].parentNode.parentNode.parentNode.cells[0].innerHTML;
            var text =  dest.innerHTML;

            console.log(time);

            var src = '';
            dest = '';
            var flag = 0;
            for (var i = 0; i < text.length; i++) {
                if (text[i+1] != '-') src += text[i];
                else {
                    flag = i;
                    break;
                }
            }

            for (var i = flag+3; i < text.length; i++) {
                dest += text[i];
            }
            localStorage.setItem("src", src);
            localStorage.setItem("dest", dest);
            // localStorage.setItem("time", time);
            window.location.replace('./report-details-booking.html');
        }

        var temp = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var routeRef = database.ref('schedule');
        var ind = 0;
        var date;
        var target = [[]];
        
        routeRef.on('child_added', snap =>{
            if (snap.val() == null) {return;}
            var content = '';
            var historyValue = snap.val();
            console.log(historyValue);
           
            content +='<tr>';
            content += '<td>' + historyValue.origin + ' - ' + historyValue.destination + '</td>';
            content += '<td>';
            content += '<div class="btn-group" role="group" aria-label="Basic example">';
            content += '<button type="button" class="btn btn-dark details" onclick="storeData(' + ind++ + ');">Details</button>'
            content += '</div>';
            content += '</td>';
            content += '</tr>';
            var a = $('#table-user');
            a.append(content);
            // console.log(content);
            // panggilinSisanya(content, historyValue);
        });

        // historyRef.on('child_added', snap =>{
        //     if (snap.val() == null) {return;}
        //     var content = '';
        //     var historyValue = snap.val();
        //     console.log(historyValue);
        //     date = new Date(historyValue.date);
        //     var month = date.getMonth();
        //     var year = date.getFullYear();
        //     content +='<tr>';
        //     content += '<td>' + temp[month] + ' ' + year + '</td></tr>';
        //     // console.log(content);
        //     panggilinSisanya(content, historyValue);
        // });


        // var historyAdminRef = database.ref('history');
        // historyAdminRef.on('child_added', snap =>{
        //     if (snap.val() == null) {return}
        //         var content = '';
        //         var historyValue = snap.val();
        //         console.log(historyValue);
        //         date = new Date(historyValue.date);
        //         var month = date.getMonth();
        //         var year = date.getFullYear();
        //         // console.log(month);
        //         content += '<tr>';
        //         content += '<td>' + temp[month] + ' ' + year + '</td>';
        //         panggilinSisanya(content, historyValue);
        // });

        function panggilinSisanya(content, historyValue){
            //bacause javascript is async
            var leadsRef = database.ref('schedule').child(historyValue.route);
            leadsRef.on('child_added', function(snapshot) {
                var temp = snapshot.origin + ' - ' + snapshot.destination;
                content += '<td>' + temp + '</td>';

            });
           
            /*
            var found = false;
            var indFound = 0;
            var date = new Date(historyValue.date);
            var month = date.getMonth();
            for(var k = 0; k < target.length; k++){
                if(target[k][0] == temp && target[k][1] == month){
                    found = true;
                    indFound = k;
                    break;
                }
            }
            if (!found) {
                target.push([temp, month, 1]);
            } else{
                target[indFound][2] ++;
                return;
            }
            content += '<td>';
            content += '<div class="btn-group" role="group" aria-label="Basic example">';
            content += '<button type="button" class="btn btn-dark details" onclick="storeData(' + ind++ + ');">Details</button>'
            content += '</div>';
            content += '</td>';
            content += '</tr>';
            var a = $('#table-user');
            a.append(content);
            generateChart();
            */
        }