

var config = {
    apiKey: "AIzaSyAa2b_WDi-vSDl4MzjTX-kWIZPZgZlRVN4",
    authDomain: "trains-e0665.firebaseapp.com",
    databaseURL: "https://trains-e0665.firebaseio.com",
    projectId: "trains-e0665",
    storageBucket: "trains-e0665.appspot.com",
    messagingSenderId: "576530385703",
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
  
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: trainFirst,
    freq: trainFreq,
    

  };

  // Uploads Train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newtrain.name);
  console.log(newtrain.dest);
  console.log(newtrain.first);
  console.log(newtrain.freq);


  alert("train successfully added");

  // Clears all of the text-boxes
  $("train-name-input").val("");
  $("#dest-input").val("");
  $("#first-input").val("");
  $("#freq-input").val("");
 
});

// FIREBASE UPDATE

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  totalTrains++;
  $("#train-count").text(totalTrains);

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;
 

  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);


  // CALC -FUNCTION- Moment.js -HELP??

  var tFrequency = 8;

   
    var firstTime = "00:00";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var trainNext = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainNext).format("hh:mm"));



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainStartFirst),
    $("<td>").text(trainFreq),
    $("<td>").text(trainNext),
  
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

