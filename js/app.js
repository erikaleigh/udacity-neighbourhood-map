// model - data storage

// addresses: Patati Patata[0], Qing Hua[1], Majestique[2], Resonance Cafe[3], Dispatch[4], Pikolo[5], Bar le Ritz[6], North Star[7], Brasserie Harricana[8]
var Model = [

 addresses = ["4177+StLaurent+Boulevard", "1676+Lincoln+Ave", "4105+StLaurent+Boulevard", "5175A+Ave+DuParc", "267+Rue+StZotique", "3418+Ave+DuParc", "179+Rue+JeanTalonOuest", "3908+StLaurent+Boulevard", "95+Rue+JeanTalonOuest"]

]
// view model - data control and storage

var viewModel =  {

};

// google maps javascript api map initialization and markers
var map;
var list = $('#list');

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.5017, lng: -73.5673},
      zoom: 12
  });

// error handling for google maps api
function googleErrorHandling() {
  var errorMsg = 'Sorry, this app couldn\'t be displayed. Please try again later.';

  var mapDiv = document.getElementById('map');
  var errorDiv = document.createElement('p');

  errorDiv.innerHTML = errorMsg;
  mapDiv.appendChild(errorDiv);
}
};
