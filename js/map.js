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
      zoom: 13,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#A7CAD7'}]
        }
      ]
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
  bounds.extend(marker.position);
  vm.locationList()[i].marker = marker;


// Open info window and change marker to flash icon when marker is clicked 'this' = marker
  marker.addListener('click', function() {
    populateInfoWindow(this, infoWindow);
    this.setIcon('img/flash.png');
  });

  // Wikipedia AJAX Request to add Wikipedia info about each metro station to infoWindow


// Populate infowindow with marker title & wikipedia api info when the marker is clicked.
  function populateInfoWindow(marker, infowindow) {

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + marker.title + '_Montreal_Metro&prop=images&imlimit=5&format=json&callback=wikiCallback';

    $.ajax({
      url: wikiUrl,
      dataType: 'jsonp'
    }).done(function(data) {
      console.log(data);
      if (articleList === undefined) {
        infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + 'Sorry no wikipedia entries could be found to match this station.' + '</p>'+ '</div>');
        infowindow.open(map, marker);
      }

    // Error handling for if no articles are returned from Wikipedia API
      else {
        var articleList = data[1];
          for (i = 0; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;

            if (infowindow.marker != marker) {
              infowindow.marker = marker;
              infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3' + '<p>' + '<a href="' + url + '">' + '</p>' + '</div>');
              infowindow.open(map, marker);

              infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
                marker.setIcon('img/camera.png');
              });
            }
          }
      }

    // Error handling for if Wikipedia API call fails

      }).fail(function() {
        infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + 'Sorry no wikipedia entries could be found to match this station.' + '</p>'+ '</div>');
        infowindow.open(map, marker);
    });
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
// Apply Knockout.js bindings
ko.applyBindings(vm);
};
