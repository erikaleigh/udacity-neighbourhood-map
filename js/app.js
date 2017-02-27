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

// google maps ajax request to get lat/lng of addresses for markers

function loadLatLng() {

  var list = $('#list');
  var geocoder;

  function initialize() {
    geocoder = new google.maps.Geocoder();
  }
  // addresses: Patati Patata[0], Qing Hua[1], Majestique[2], Resonance Cafe[3], Dispatch[4], Pikolo[5], Bar le Ritz[6], North Star[7], Brasserie Harricana[8]
  var address = ["4177+StLaurent+Boulevard", "1676+Lincoln+Ave", "4105+StLaurent+Boulevard", "5175A+Ave+DuParc", "267+Rue+StZotique", "3418+Ave+DuParc", "179+Rue+JeanTalonOuest", "3908+StLaurent+Boulevard", "95+Rue+JeanTalonOuest"];

  for(i = 0; i < address.length; i++) {
      var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address[i] + ",+Montreal,+QC&key=AIzaSyB5AbPmlDlDnZ2D3rLzXHAdznIyMhea9KY";

      $.ajax({
        type: "GET",
        url: googleURL,
      }).done(function() {
          list.append(results[i].geometry);
      }).fail(function() {
          alert('fail');
      });
  };


};
loadLatLng();
