// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var timeBlock = [
  [$('#hour-9')],
  [$('#hour-10')],
  [$('#hour-11')],
  [$('#hour-12')],
  [$('#hour-13')],
  [$('#hour-14')],
  [$('#hour-15')],
  [$('#hour-16')],
  [$('#hour-17')],
];

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveBtn = $('.btn saveBtn col-2 col-md-1');
  var scheduleContainer = $('#schedule-container');

  saveBtn.on('click', function() {
    var timeArray = [];

    for (i = 0; i < 9; i++) {
      var eventInput = scheduleContainer.children().eq().children().value();

      timeArray.push(eventInput);
      localStorage.setItem('savedEvent', JSON.stringify(timeArray));
      console.log(timeArray);
    }
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  function timeCheck() {
    var currentHour = dayjs().format('HH');

    for (i = 0; i < timeBlock.length; i++) {
      var hourBlock = timeBlock[i][0];

      if (timeBlock[i].id == "hour-" + currentHour) {
        hourBlock.addClass('present'); 
      } else if (timeBlock[i].id == "hour-" + currentHour) {
        hourBlock.addClass('past');
      } else {
        hourBlock.addClass('future');
      }
    }
  }
  timeCheck();

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  
  function storeEvent () {
    var savedEvents = JSON.parse(localStorage.getItem('savedText'));

    if (savedEvents !== null) {
      for (i = 0; i < 9; i++) {
        var textInput = scheduleContainer.children().eq().children().value();

        textInput.text(savedEvents[i]);
      }
    } else {
      console.log('No events saved.');
    }
  }
  storeEvent();

  // TODO: Add code to display the current date in the header of the page.

  setInterval (timeCheck, 1000);
  var today = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(today);
});
