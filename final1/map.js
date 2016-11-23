var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

var dbName = 'aaDatabase';
var collName = 'meetings';
var url = 'mongodb://0.0.0.0:27017/' + dbName;

var meetings = JSON.parse(fs.readFileSync('output.json'));

function initialize() {
    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(40.736354, -73.999175),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
            elementType: 'geometry',
            stylers: [{
                color: '#242f3e'
            }]
        }, {
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#242f3e'
            }]
        }, {
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#746855'
            }]
        }, {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        }, {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{
                color: '#263c3f'
            }]
        }, {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#6b9a76'
            }]
        }, {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{
                color: '#38414e'
            }]
        }, {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#212a37'
            }]
        }, {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#9ca5b3'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{
                color: '#746855'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
                color: '#1f2835'
            }]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#f3d19c'
            }]
        }, {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{
                color: '#2f3948'
            }]
        }, {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#d59563'
            }]
        }, {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{
                color: '#17263c'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
                color: '#515c6d'
            }]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
                color: '#17263c'
            }]
        }]
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);

    GeoMarker = new GeolocationMarker();
    GeoMarker.setCircleOptions({
        strokeColor: '#0078c1'
    }, {
        fillColor: '#0078c1'
    }, {
        fillOpacity: .4
    });

    google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
        map.setCenter(this.getPosition());
        map.fitBounds(this.getBounds());
    });

    google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
        alert('There was an error obtaining your position. Message: ' + e.message);
    });

    GeoMarker.setMap(map);

    var infoWindow = new google.maps.InfoWindow();
    console.log(meetings);

    for (var i = 0; i < meetings.length; i++) {
        var data = meetings[i];
        var latLng = new google.maps.LatLng(data.latLong.lat, data.latLong.lng);

        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: data.locationName
        });

        (function(marker, data) {

            var notes;

            if (data.notes == null) {
                notes = "";
            }
            else {
                notes = "Notes: " + data.notes;
            }


            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<h1 id='firstHeading'>" + data.groupName + "</h1><p>" + data.locationName + "<br>" + data.address + "</p><p><strong>" + data.day + "</strong>, " + data.startTime + "h to " + data.endTime + "h</p><p>Meeting Type: " + data.meetingType + "<br>" + notes + "</p>");
                infoWindow.open(map, marker);
            });


        })(marker, data);

    }

}

google.maps.event.addDomListener(window, 'load', initialize);

if (!navigator.geolocation) {
    alert('Your browser does not support geolocation');
}