// View Model - data control and storage

var ViewModel = function() {
  var self = this;

 // Set up a Location constructor to be used to set the locations to the list view as well as for markers
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

//  Initiate google event to open infoWindow when list item is clicked
  self.openWindow = function(place){
    google.maps.event.trigger(place.marker, 'click');
  };

// Close view model
};
// Store ViewModel in vm variable for instantiation in map.js
var vm = new ViewModel();
