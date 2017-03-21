// jQuery event for toggling mobile nav in and out
// Set size of mapDiv to match the list height

$('.hamburger').on('click', function() {
  $('.list-box').toggleClass('list-box-open');
  var sideHeight = $('.list-box').outerHeight();
  $('#mapDiv').height(sideHeight);
});


// Close mobile nav when list item is clicked

$('.list-item').on('click', function() {
  $('list-box').toggleClass('list-box-open');
});
