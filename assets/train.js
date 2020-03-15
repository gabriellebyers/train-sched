


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBBLhftAOiqBzWKBwZWyoIHULy2ry5eIFU",
    authDomain: "train-sched-2dbe4.firebaseapp.com",
    databaseURL: "https://train-sched-2dbe4.firebaseio.com",
    projectId: "train-sched-2dbe4",
    storageBucket: "train-sched-2dbe4.appspot.com",
    messagingSenderId: "129344742009",
    appId: "1:129344742009:web:89d955d4f6074a34e3eaa8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirst = moment($("#firsttrain-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newtrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newtrain);

  // Logs everything to console
  console.log(newtrain.name);
  console.log(newtrain.destination);
  console.log(newtrain.first);
  console.log(newtrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firsttrain-input").val("");
  $("#frequncy-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().freq;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirst);
  console.log(trainFreq);

//   // Prettify the trainfirst
//var trainFirstconvert = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var trainMonths = moment().diff(moment(trainFirst, "X"), "months");
//   console.log(trainMonths);


var tFrequency = trainFreq;

// Time is 3:30 AM
var firstTime =   moment.unix(trainFirst).format("HH:mm");
console.log("first time: "+firstTime)
// First Time (pushed back 1 year to make sure it comes before current time)


var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");


console.log("converted: " + firstTimeConverted);

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
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var nextTrainPretty = moment(nextTrain).format("hh:mm");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));





//   // Calculate the total billed freq
//   var trainBilled = trainMonths * trainFreq;
//   console.log(trainBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrainPretty),
    $("<td>").text(tMinutesTillTrain)
    // $("<td>").text(trainBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});