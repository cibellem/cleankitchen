// Get references to page elements
var $deleteOrder = $("#deleteOrder");
const $recallOrder = $(".recallOrder")
var $completeOrder = $("#complete")

const $orders = $(".expoContainer");
const $modal = $("#myModal");
const $modalList = $("#modal-list");

$deleteOrder.on("click", function () {

  console.log("working")
  var id = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/items/" + id, {
    type: "DELETE"
  }).then(
    function () {

      // Reload the page to get the updated list 
      location.reload();
    })
});

$completeOrder.on("click", function () {

  console.log("working")
  const orderNumber = $(this).data("id");

  // Send the DELETE request.
  $.ajax("/api/items/orderNumber/" + orderNumber, {
    type: "DELETE"
  }).then(
    function () {

      // Reload the page to get the updated list 
      location.reload();
    })
})


$recallOrder.on("click", function () {
  console.log("worked")

  $.ajax({
    url: "/api/items/",
    type: "GET"
  }).then(
    function () {
      console.log('worked too')
    }
  )

});

$orders.click(function (event) {
  const HTMLParent = findCardParentIfExists(event.target);

  if (HTMLParent) {
    let orderNumber = $(HTMLParent).attr("id");

    orderNumber = orderNumber.split("-");
    orderNumber = parseInt(orderNumber[orderNumber.length - 1]);

    $.ajax("/api/items/orderNumber/" + orderNumber, {
      type: "GET"
    }).then(function (itemsDB, error) {

      generateItemsForModal(itemsDB, HTMLParent);
      $modal.modal("show");
    });

  }
  else {
    console.warn("Could not find a card parent");
  }
});

$modal.on("hidden.bs.modal", function () {

  clearModal();

})

function findCardParentIfExists(HTMLelement) {
  if (HTMLelement.parentElement != null) {
    if ($(HTMLelement.parentElement).hasClass("expoCard")) {
      return HTMLelement.parentElement;
    }
    else {
      return findCardParentIfExists(HTMLelement.parentElement);
    }
  }
  else {
    return null;
  }
}

function generateItemsForModal(items, parent) {

  items.forEach(item => {

    const listItem = $("<li>").addClass("liExpo list-group-item");
    const itemName = $("<span>").text(item.name);
    const itemMod = $("<small>").addClass("mods").text(item.mods);

    listItem.append(itemName);
    listItem.append("<br>");
    listItem.append(itemMod);

    $modalList.append(listItem);
  });

  $("#modal-order-number").text(items[0].orderNumber);
  $("#modal-time").text(items[0].currentTime);
  $("#complete").attr("data-id", items[0].orderNumber);

}

function clearModal() {

  $modalList.empty();

}

setInterval(function () {

  console.log("incrementing time");
  $times = $(".current-time");

  let element = 0;


  while ($times[element]) {
    const $time = $($times[element]);
    let timeID = $time.attr("id");
    timeID.split("-");
    timeID = parseInt(timeID[timeID.length - 1]);
    console.log(timeID);

    $time.text(incrementTime($time.text()));


    element++;

    sendNewTime(timeID, $time.text());

  };
}, 1000
)


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