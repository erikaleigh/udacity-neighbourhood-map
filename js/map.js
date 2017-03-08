/*
 * GOOGLE MAPS
 * Use JavaScript API to initialize map, markers and info windows
 */

var map;
var marker;
var markers = [];

// Initialize Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.5017, lng: -73.5673},
      zoom: 13
  });
// Set transit layer styling to make metro lines more visible
  var transitLayer = new google.maps.TransitLayer();
         transitLayer.setMap(map);

// Initialize info windows and map bounds
var infoWindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

// Add markers from locations listed in model - var locations
for (i = 0; i < locations.length; i++) {
  var position = locations[i].location;
  var title = locations[i].title;
  var markerImg = 'img/camera.png';

  marker = new google.maps.Marker({
    map: map,
    position: position,
    title: title,
    icon: markerImg,
    animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
  bounds.extend(marker.position);

/* Open info window and change marker to flash icon when marker is clicked
 * 'this' = marker
 */
  marker.addListener('click', function() {
    populateInfoWindow(this, infoWindow);
    this.setIcon('img/flash.png');
  });

/* Populate infowindow with marker title when the marker is clicked
 * Check to make sure info window is not already open before performing
 */
  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      infowindow.addListener('closeclick', function() {
        infowindow.setMarker = null;
        marker.setIcon('img/camera.png');
      });
    }
  }
  map.fitBounds(bounds);
}

// Error handling for google maps api
function googleErrorHandling() {
  var errorMsg = 'Sorry, this app couldn\'t be displayed. Please try again later.';

  var mapDiv = document.getElementById('map');
  var errorDiv = document.createElement('p');

  errorDiv.innerHTML = errorMsg;
  mapDiv.appendChild(errorDiv);
}
};
