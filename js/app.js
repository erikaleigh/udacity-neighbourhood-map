// model - data storage

// addresses: Patati Patata[0], Qing Hua[1], Majestique[2], Resonance Cafe[3], Dispatch[4], Pikolo[5], Bar le Ritz[6], North Star[7], Brasserie Harricana[8]
var Model = [

 locations = [
   {title: "Patati Patata Friterie de Luxe", location: {lat: 45.51808800000001, lng: -73.58135759999999}},
   {title: "Qing Hua", location: {lat: 45.4953826, lng: -73.58110479999999}},
   {title: "Majestique", location: {lat: 45.5175626, lng: -73.58028349999999}},
   {title: "Resonance Café", location: {lat: 45.5204813, lng: -73.597157}},
   {title: "Café Dispatch", location: {lat: 45.5289229, lng: -73.6160596}},
   {title: "Café Pikolo", location: {lat: 45.5085961, lng: -73.5717465}},
   {title: "Bar le Ritz PDB", location: {lat: 45.5326855, lng: -73.6203424}},
   {title: "North Star Pinball", location: {lat: 45.5163155, lng: -73.5782292}},
   {title: "Brasserie Harricana", location: {lat: 45.5337701, lng: -73.61937089999999}},
 ]





]

// view model - data control and storage

var viewModel =  {

};

// google maps javascript api map initialization and markers
var map;
var markers = [];
var list = $('#list');

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.5017, lng: -73.5673},
      zoom: 12
  });

for (i = 0; i < locations.length; i++) {
  var position = locations[i].location;
  var title = locations[i].title;

  var marker = new google.maps.Marker({
    map: map,
    position: position,
    title: title,
    animation: google.maps.Animation.DROP,
  });
  markers.push(marker);
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
