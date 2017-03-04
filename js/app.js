// google maps javascript api map initialization and markers
var map;
var markers = [];
var list = $('#list');


// initialize Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.5017, lng: -73.5673},
      zoom: 13
  });
  // set transit layer styling
  var transitLayer = new google.maps.TransitLayer();
         transitLayer.setMap(map);

// initialize info windows
var infoWindow = new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds();

// Add markers from locations listed in Model.locations
for (i = 0; i < locations.length; i++) {
  var position = locations[i].location;
  var title = locations[i].title;
  var markerImg = 'img/camera.png';

  var marker = new google.maps.Marker({
    map: map,
    position: position,
    title: title,
    icon: markerImg,
    animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
  bounds.extend(marker.position);

/* click event for each marker to open infowindow. change icon to flash when clicked. 'this' = marker */
  marker.addListener('click', function() {
    populateInfoWindow(this, infoWindow);
    this.setIcon('img/flash.png');
  });

  /* populates the infowindow when the marker is clicked. Checks to make sure info window is not already open before performing function, if not, opens the info window, sets the marker title in the window */
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

// error handling for google maps api
function googleErrorHandling() {
  var errorMsg = 'Sorry, this app couldn\'t be displayed. Please try again later.';

  var mapDiv = document.getElementById('map');
  var errorDiv = document.createElement('p');

  errorDiv.innerHTML = errorMsg;
  mapDiv.appendChild(errorDiv);
}
};



// model - data storage

 var locations = [
   {title: "Metro McGill", location: {lat: 45.5045824, lng: -73.5718572}},
   {title: "Metro Place des Arts", location: {lat: 45.5081846, lng: -73.5679968}},
   {title: "Metro Peel", location: {lat: 45.50083, lng: -73.5752449}},
   {title: "Metro Atwater", location: {lat: 45.4898065, lng: -73.58632469999999}},
   {title: "Metro Berri-UQAM", location: {lat: 45.5141806, lng: -73.5617994}},
   {title: "Metro Laurier", location: {lat: 45.527522, lng: -73.58905589999999 }},
   {title: "Metro Sherbrooke", location: {lat: 45.5190038, lng: -73.5681311}},
   {title: "Metro Jarry", location: {lat: 45.5433543, lng: -73.6285032}},

   {title: "Metro Bonaventure", location: {lat: 45.497977, lng: -73.5676258}},
   {title: "Metro Jean-Talon", location: {lat: 45.5389207, lng: -73.6141987}},
   {title: "Metro St-Michel", location: {lat: 45.5599217, lng: -73.6000536}},
];

var Entry = function(data) {
  this.title = ko.observable(data.title);
}


// view model - data control and storage

var ViewModel = function() {

this.list = ko.observableArray([]);

locations.forEach(function(entry) {
  this.list.push( new Entry (entry))
});

};
ko.applyBindings(new ViewModel());
