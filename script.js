// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var timeBlock = [
  $('#hour-09'),
  $('#hour-10'),
  $('#hour-11'),
  $('#hour-12'),
  $('#hour-13'),
  $('#hour-14'),
  $('#hour-15'),
  $('#hour-16'),
  $('#hour-17'),
];

$(function () {
  // Add a listener for click events on the save button. 
  var saveBtn = $('.saveBtn');
  var scheduleContainer = $('#schedule-container');
  
  saveBtn.on('click', function() {
    var timeID = $(this).parent().attr("id")
    var textValue = $(this).siblings("textarea").val()
    localStorage.setItem(timeID, textValue)

  });
  
  // Code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 
  
  function timeCheck() {
    var currentHour = dayjs().format('HH'); 
    var currentHourInt = parseInt(currentHour)

  
    for (i = 0; i < timeBlock.length; i++) {
      var hourBlock = timeBlock[i];
      var hour = i + 9
  
      if (hour === currentHourInt) {
        console.log('present')
        hourBlock.addClass('present'); 
        hourBlock.removeClass('past');
        hourBlock.removeClass('future');
      } else if (hour < currentHourInt) {
        hourBlock.addClass('past');
        hourBlock.removeClass('present');
        hourBlock.removeClass('future');
      } else {
        hourBlock.addClass('future');
        hourBlock.removeClass('past');
        hourBlock.removeClass('present');
      }
    }
  }

  timeCheck();
  // Code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements

  $( ".description" ).each(function( index ) {
    var timeId = $(this).parent().attr("id")
    var textValue =localStorage.getItem(timeId)
    $(this).val(textValue)
  });

  // Code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements
  
  function storeEvent () {
    var savedEvents = JSON.parse(localStorage.getItem('savedText'));
  
    if (savedEvents === null) {
      savedEvents = []
      console.log('No events saved.');
    }
      savedEvents.push("localstorage events")
      console.log(savedEvents)
      localStorage.setItem("savedText", JSON.stringify(savedEvents))
    }

  storeEvent();
  
  // Code to display the current date in the header of the page.
  var today = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(today);
});