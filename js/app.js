
// Model - data storage

var g = "green";
var b = "blue";
var o = "orange";
var y = "yellow";


 var locations = [
   {line: g, title: "Metro McGill", location: {lat: 45.5045824, lng: -73.5718572}},
   {line: g, title: "Metro Place des Arts", location: {lat: 45.5081846, lng: -73.5679968}},
   {line: g, title: "Metro Peel", location: {lat: 45.50083, lng: -73.5752449}},
   {line: g, title: "Metro Atwater", location: {lat: 45.4898065, lng: -73.58632469999999}},
   {line: y, title: "Metro Berri-UQAM", location: {lat: 45.5141806, lng: -73.5617994}},
   {line: o, title: "Metro Laurier", location: {lat: 45.527522, lng: -73.58905589999999 }},
   {line: o, title: "Metro Sherbrooke", location: {lat: 45.5190038, lng: -73.5681311}},
   {line: o, title: "Metro Jarry", location: {lat: 45.5433543, lng: -73.6285032}},
   {line: o, title: "Metro Bonaventure", location: {lat: 45.497977, lng: -73.5676258}},
   {line: b, title: "Metro Jean-Talon", location: {lat: 45.5389207, lng: -73.6141987}},
   {line: b, title: "Metro St-Michel", location: {lat: 45.5599217, lng: -73.6000536}},
];

// View Model - data control and storage

var ViewModel = function() {
  var self = this;

/* Push the titles of all items in var locations to an observable array,
 * which is bound to the list view
 */
 var Location = function(data) {
   this.title = ko.observable(data.title);
 };

  self.locationList = ko.observableArray([]);

  locations.forEach(function(locationItem) {
    self.locationList.push( new Location(locationItem));
  });


// Knockout click event to initiate opening infoWindow when list item is clicked
  self.markers = ko.observableArray([]);

  self.openWindow = function(place){
    google.maps.event.trigger(place.marker, 'click');
  }
};
// Store ViewModel in vm variable for instantiation in map.js

var vm = new ViewModel();
