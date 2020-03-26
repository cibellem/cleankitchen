// import { INSPECT_MAX_BYTES } from "buffer";

var $toCook = $(".toCook");
var $cooking = $(".cooking")
var $restart = $(".restart")
var $recallOrder = $(".recallOrder");

$toCook.on("dblclick", function () {

  console.log("changed status to: working");
  var id = $(this).data("id");
  console.log(id);
  var status = $(this).data("status")


  var working = "working"
  // Send the PUT request.
  $.ajax("/api/items/" + id, {
    type: "PUT",
    data: {
      status: working
    }
  }).then(
    function () {


      console.log("changed status to: working");
      $toCook.addClass("bg-green")
      // Reload the page to get the updated list
      window.location.reload();
    }
  );



});


// function highlight(status){

//   if(status ==="working"){
//     this.hig
//   }
// }


$restart.on("dblclick", function () {

  console.log("changed status to: working");
  var id = $(this).data("id");
  console.log(id);
  var status = $(this).data("status")

  var working = "working"
  // Send the PUT request.
  $.ajax("/api/items/" + id, {
    type: "PUT",
    data: {
      status: working
    }
  }).then(
    function () {
      console.log("changed status to: working");
      // Reload the page to get the updated list
      window.location.reload();
    }
  );
});


$cooking.on("dblclick", function () {

  var id = $(this).data("id");
  var finished = "finished"
  console.log(id);
  // var status = $(this).data("status")
  var finished = "finished"
  // Send the PUT request.
  $.ajax("/api/items/" + id, {
    type: "PUT",
    data: {
      status: finished
    }
  }).then(
    function () {
      console.log("changed status to: finished");
      // Reload the page to get the updated list
      window.location.reload();
    }
  );

});


function sendNewTime(id, newTime) {
  $.ajax({
    url: "/api/items/" + id,
    type: "PUT",
    data: {
      currentTime: newTime
    }
  }).then(function (res, err) {
    console.log("Sent time");
  })
}

function incrementTime(currentTime) {
  let newTime = currentTime;

  newTime = newTime.split(":");

  let minutes = parseInt(newTime[0]);
  let seconds = parseInt(newTime[1]);

  if (seconds < 59) {
    seconds++;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  }
  else {
    minutes++;
    seconds = "00";
  }

  newTime = `${minutes}:${seconds}`;

  return newTime;

};

$recallOrder.on("click", function () {
  $.ajax({
    url: "/station/:id/recall",
    type: "GET"
  }).then(
    function () {
      console.log('worked too')
    })
}
);
