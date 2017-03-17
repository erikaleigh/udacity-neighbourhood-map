
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

 // Set up a Location constructor to be used to set the locations to the list view as well as for the markers.
 var Location = function(data) {
   this.title = data.title;
   this.line = data.line;
   this.marker = data.marker;
   this.isVisible = ko.observable(true);
 };


  self.locationList = ko.observableArray([]);

// Push all locations to an array - locationList

  locations.forEach(function(locationItem) {
    self.locationList.push( new Location(locationItem));
  });

// Set up dropdown menu options for filtering the list view and markers

  self.lineOptions = ['all lines', 'orange', 'green', 'blue', 'yellow'];

// Initialize the selectedLine as "all lines" to set default of all list items and markers showing upon load

  self.selectedLine = ko.observable(self.lineOptions[0]);

// Filter list items corresponding markers according to their .line property (which metro line they fall on). Toggle visibility if corresponding line is selected

  self.filterItems = ko.computed(function() {
    var listItem = self.locationList();
    var selectedLine = self.selectedLine();
    for (var i = 0; i < listItem.length; i++) {
      if (selectedLine === self.lineOptions[0]) {
        listItem[i].isVisible(true);
        if (marker) {
          listItem[i].marker.setVisible(true);
        }

      }
      else if (selectedLine !== listItem[i].line) {
        listItem[i].isVisible(false);
        listItem[i].marker.setVisible(false);
      }
      else {
        listItem[i].isVisible(true);
        listItem[i].marker.setVisible(true);
      }
    }
  });

  self.markers = ko.observableArray([]);

// Knockout click event to initiate opening infoWindow when list item is clicked
  self.openWindow = function(place){
    google.maps.event.trigger(place.marker, 'click');
  };

};
// Store ViewModel in vm variable for instantiation in map.js
var vm = new ViewModel();
