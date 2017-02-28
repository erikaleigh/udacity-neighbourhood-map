// model - data storage

// addresses: Patati Patata[0], Qing Hua[1], Majestique[2], Resonance Cafe[3], Dispatch[4], Pikolo[5], Bar le Ritz[6], North Star[7], Brasserie Harricana[8]
 var address = ["4177+StLaurent+Boulevard", "1676+Lincoln+Ave", "4105+StLaurent+Boulevard", "5175A+Ave+DuParc", "267+Rue+StZotique", "3418+Ave+DuParc", "179+Rue+JeanTalonOuest", "3908+StLaurent+Boulevard", "95+Rue+JeanTalonOuest"];


// view model - data control and storage

var viewModel =  {

};

// google maps javascript api - map initialization and markers
var map;
var list = $('#list');
var geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.5017, lng: -73.5673},
      zoom: 12
  });

  function codeAddress() {
      var address = "4177 St Laurent Boulevard, Montreal, QC";
      geocoder.geocode( { 'address': address }, function(results, status) {
        if (status == 'OK') {
          console.log(status);
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        } else {
          alert("FAILED BECAUSE" + status);
        }
      });
    };
}

// error handling for google maps api
function googleErrorHandling() {
  var errorMsg = 'Sorry, this app couldn\'t be displayed. Please try again later.';

  var mapDiv = document.getElementById('map');
  var errorDiv = document.createElement('p');

  errorDiv.innerHTML = errorMsg;
  mapDiv.appendChild(errorDiv);
};
