// model - data storage



// view model - data control and storage

var viewModel =  {

};

// google maps javascript api
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.5017, lng: -73.5673},
      zoom: 12
  });
}

// error handling for google maps api
function googleErrorHandling() {
  var errorMsg = 'Sorry, this app couldn\'t be displayed. Please try again later.';

  var mapDiv = document.getElementById('map');
  var errorDiv = document.createElement('p');
  
  errorDiv.innerHTML = errorMsg;
  mapDiv.appendChild(errorDiv);
};
