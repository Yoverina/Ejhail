var dataset = [];
var done = [];
target.shift();
var bookingCtx = document.getElementById("booking");
    
    function generateChart(){
        dataset = [];
        done = [];
        for (var i = 0; i < target.length; i++) {
            var obj = {};
            if(done.indexOf(target[i][0]) != -1){
                continue;
            } else{
                done.push(target[i][0]);
                obj['label'] = target[i][0];
                var arr = [];
                arr.push(target[i][2]);
                for (var j = i+1; j < target.length; j++) {
                    if(target[j][0] == target[i][0]){
                        arr.push(target[j][2]);
                        console.log(target[j][2], target[j][0]);
                    }
                 
                }
                obj['data'] = arr;
                obj['fill'] = false;
                obj['borderColor'] = getRandomColor();
            }
            dataset.push(obj);
            console.log(dataset);
        }
        var bookingChart = new Chart(bookingCtx, {
            type: 'line',
            data: {
                labels: ["January", "February", "March"],
                datasets: dataset
            },
            options: {
                elements: {
                    line: {
                        tension: 0,
                    }
                }
            }
        });
    }

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }