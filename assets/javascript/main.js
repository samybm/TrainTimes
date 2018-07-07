// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1.  Firebase key
var config = {
    apiKey: "AIzaSyAa2b_WDi-vSDl4MzjTX-kWIZPZgZlRVN4",
    authDomain: "trains-e0665.firebaseapp.com",
    databaseURL: "https://trains-e0665.firebaseio.com",
    projectId: "trains-e0665",
    storageBucket: "trains-e0665.appspot.com",
    messagingSenderId: "576530385703"
  };


firebase.initializeApp(config);

var database = firebase.database();

var totalTrains = 0;

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#Dest-input").val().trim();
  var trainFirst = moment($("#First-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainFreq = $("#freq-input").val().trim();
  var trainNext = $("#train-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq,
    next: trainNext,

  };

  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newtrain.name);
  console.log(newtrain.dest);
  console.log(newtrain.first);
  console.log(newtrain.freq);
  console.log(newtrain.rate);

  alert("train successfully added");

  // Clears all of the text-boxes
  $("train-name-input").val("");
  $("#dest-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  totalTrains++;
  $("#train-count").text(totalTrains);

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;
  var trainRate = childSnapshot.val().rate;

  // train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);
  console.log(trainRate);


  // Prettify the Train start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainMonths = moment().diff(moment(trainStart, "X"), "months");
  console.log(trainMonths);

  // Calculate the total billed rate
  var trainBilled = trainMonths * trainFreq;
  console.log(trainBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainRole),
    $("<td>").text(trainStartPretty),
    $("<td>").text(trainMonths),
    $("<td>").text(trainRate),
    $("<td>").text(trainBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
