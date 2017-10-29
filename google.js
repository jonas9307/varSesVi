
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCuipMVrzTRGdSX_eyD-yrqLISVq1YIO2s&libraries=places">

var map;
var infoWindow;
var radius;

function initMap() {
  var pyrmont = {lat: 57.70, lng: 11.93};
  if (typeof $("#distance")[0] !== 'undefined' && Number($("#distance")[0].value) > 0) {
    // the variable is defined
    radius = Number($("#distance")[0].value);
  } else {
    radius = 500;
  }

  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var service = new google.maps.places.PlacesService(map);
      search(service, pos, callback);
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // var service = new google.maps.places.PlacesService(map);
  // search(service, map.getCenter(), callback);

  
  // service.nearbySearch({
  //   location: pyrmont,
  //   radius: radius,
  //   type: ['food']
  // }, callback);


}

function search(service, location, callback) {
  service.nearbySearch({
      location: location,
      radius: radius,
      type: ['mat']
    }, callback);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
//document.getElementById("test").innerHTML = JSON.stringify(results);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function searchPlaces() {
  initMap();
}