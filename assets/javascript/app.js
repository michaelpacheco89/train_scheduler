// ==================================================//
// ============ KINGSCROSS SCHEDULE=============//
// ==================================================//

// *Initializing FIREBASE
// =========================

  var config = {
    apiKey: "AIzaSyAWvX434_4GVNGfY3PFWb5yjWGxv7zz5y4",
    authDomain: "hogwarts-express.firebaseapp.com",
    databaseURL: "https://hogwarts-express.firebaseio.com",
    projectId: "hogwarts-express",
    storageBucket: "hogwarts-express.appspot.com",
    messagingSenderId: "966209309880"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // *Global Variables
  // =======================


  // *On Click Event
  // =========================

  $("#submit-search-info").on("click", function(event){
  	event.preventDefault();
  	// console.log("this is a click test");
  	
// *create variables to store user input
// ========================================
	var trainName = $("#train-name").val().trim();
	var trainDestination = $("#train-destination").val().trim();
  var trainTime = $("#trainTime").val().trim();
	var trainFreq = $("#train-frequency").val().trim();

 	console.log(trainName);
 	console.log(trainDestination);
 	console.log(trainTime);
 	console.log(trainFreq);

 


// *push to firebase
// =======================

  database.ref().push({
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: trainFreq,
      dataAdded: firebase.database.ServerValue.TIMESTAMP

  });

// *alert that train was added successfully
// =========================================

  alert("Train Added successfully");



// *clear input field
// ========================

  $("#train-name").val("");
  $("#train-destination").val("");
  $("#trainTime").val("");
  $("#train-frequency").val("");

// *close on-click 
// ==================
});
// ======


// *firebase snapshot/child added
// ================================

  database.ref().on("child_added", function(childSnap){

    var trainName = childSnap.val().name;
    var destination = childSnap.val().destination;
    var trainTime = childSnap.val().time;
    var frequency = childSnap.val().frequency;

// formula to get arrival time and min till
// =========================================

      var currentTime = moment();
    
      var trainTimeConverted = moment(trainTime,"hh:mm").subtract(1, "years");
        console.log(trainTimeConverted);
    
      var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
        console.log(diffTime);
    
      var tRemainder = diffTime % frequency;
        console.log("the tRemainder:" + moment(tRemainder));
    
      var minAway = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minAway);
    
      var arrivalTime = moment().add(minAway, "minutes")
        console.log("ARRIVAL TIME: " + moment(arrivalTime).format("hh:mm"))

// append info to page
// =========================

      var newRow = $("<tr>");
      newRow.append("<td>" + trainName + "</td>");
      newRow.append("<td>" + destination + "</td>");
      newRow.append("<td>" + frequency + "</td>");
      newRow.append("<td>" + moment(arrivalTime).format("hh:mm") + "</td>");
      newRow.append("<td>" + minAway + "</td>");   
  

      $("tbody").append(newRow);

 });












