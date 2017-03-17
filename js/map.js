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




// Populate infowindow with marker title & wikipedia api info when the marker is clicked.
  function populateInfoWindow(marker, infowindow) {

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '_(Montreal_Metro)&imlimit=5&format=json&callback=wikiCallback';

  // Wikipedia AJAX Request to add Wikipedia entry on selected metro station to infoWindow
    $.ajax({
      url: wikiUrl,
      dataType: 'jsonp'
    }).done(function(data) {
      console.log(data);

      var articleUrl = data[3][0];
      var articleDescr = data[2][0];
      console.log(articleUrl, articleDescr);
      // Error handling for if no articles are returned from Wikipedia API
      if (articleUrl === undefined) {
        infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + 'Sorry no wikipedia entries could be found to match this station.' + '</p>'+ '</div>');
        infowindow.open(map, marker);
        console.log('articleUrl is undefined');
      }
      else {
              console.log(articleUrl);
              infowindow.marker = marker;
              infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + articleDescr + '<a href="' + articleUrl + '" target="blank">' + '..' + ' Read More'+ '</a>' + '</p>' + '</div>');
              infowindow.open(map, marker);
      }

    // Error handling for if Wikipedia API call fails

      }).fail(function() {
        infowindow.setContent('<div>' + '<h3>' + marker.title + '</h3>' + '<p>' + 'Sorry no wikipedia entries could be found to match this station.' + '</p>'+ '</div>');
        infowindow.open(map, marker);

    });

  // Close info window and change marker back to camera when user clicks on the map
    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
      infowindow.setMarker = null;
      marker.setIcon('img/camera.png');
    });
    google.maps.event.addListener(infowindow, 'closeclick', function() {
      infowindow.close();
      infowindow.setMarker = null;
      marker.setIcon('img/camera.png');
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
