 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyD6VCpLfgjpReAXYBEke8-JRFWfaV4VXEo",
  authDomain: "train-schedule-523f8.firebaseapp.com",
  databaseURL: "https://train-schedule-523f8.firebaseio.com",
  projectId: "train-schedule-523f8",
  storageBucket: "train-schedule-523f8.appspot.com",
  messagingSenderId: "480429818730"
};
firebase.initializeApp(config);
// Reference to Firebase
  var database = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var freq = "";
  var nextArr = "";
  var minAway = "";
 
  // Tried to make a digital clock appear within the JumboTron, might come back to it
  // var clock = document.getElementById('clock');
  // function updateTime () {
  //   const now = moment();
  //   const humanReadable = now.format("HH:MM:SS");
  //   clock.textContent = humanReadable;

  // };
  // setInterval(updateTime, 1000);
  // updateTime();

  // Capture User Button
  $("#newTrainForm").on("submit", function(event) {

    event.preventDefault();

    // Grab values from text Boxes
    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    freq = $("#frequency").val().trim();
    
    // Console.log to check 
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(freq);

    // Code for handling push
    database.ref().push({
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      freq: freq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });



  });

  database.ref().on("child_added", function(childSnapshot) {

    var updaTrainName = childSnapshot.val().trainName;
    var updaDestination = childSnapshot.val().destination;
    var updaFirstTrain = childSnapshot.val().firstTrain;
    var updaFreq = childSnapshot.val().freq;
    var $row = $('<tr></tr>').appendTo('#all-display');

    $("<td></td>").appendTo($row).text(trainName);
    $("<td></td>").appendTo($row).text(destination);
    $("<td></td>").appendTo($row).text(firstTrain);
    // $("<td></td>").appendTo($row).text(freq);


  // Current Time (has to be before rest)
  var nowTime = moment();

  // First run. A year back
  var firstRun = moment(updaFirstTrain, "hh:mm").subtract(1, "years");

  // Difference
  var diffTime = moment().diff(moment(firstRun), "minutes");
  // Remainder
  // var remainder = diffTime / updaFreq; *Wrong math
  var remainder = diffTime % updaFreq;
  // Min before arrival
  var minTill = updaFreq - remainder;
  // Next Arrival
  var nextTrain = moment().add(minTill, "minutes");
  var getTrain = moment(nextTrain).format("hh:mm:A");

  $("<td></td>").appendTo($row).text(getTrain);
  $("<td></td>").appendTo($row).text(minTill);

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
}


);

