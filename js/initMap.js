function initMap() {
    //WSA
    var sourceWSA = {lat: -6.189644, lng: 106.798392};
    var mapWSA = new google.maps.Map(document.getElementById('mapWSA'), {
        zoom: 18,
        center: sourceWSA
    });
    var markerWSA = new google.maps.Marker({
        position: sourceWSA,
        map: mapWSA
    });

    //BLI
    var sourceBLI = {lat: -6.585254, lng: 106.882400};
    var mapBLI = new google.maps.Map(document.getElementById('mapBLI'), {
        zoom: 18,
        center: sourceBLI
    });
    var markerBLI = new google.maps.Marker({
        position: sourceBLI,
        map: mapBLI
    });

    //Bogor

    //Alsut
            
    //Kelapa Gading

}