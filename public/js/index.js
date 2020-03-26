const $menuItems = $(".menu-items");
const $mods = $(".mods");
const $sendToItemDB = $(".send-to-db");
const $reset = $(".reset");

let newItem = {

  name: "",
  orderNumber: -1,
  station: -1,
  mods: "",
  highlight: "",
  averageTime: ""
};

let modsToSend = [];

const API = {

  getMenuItem: function (id) {
    return $.ajax({
      url: "api/menu/" + id,
      type: "GET"
    });
  },
  setMenuItem: function (item) {
    return $.ajax({
      url: "api/items/",
      type: "POST",
      data: item
    })
  }
};

$(".menu-items").click(function (event) {
  console.log(event);

  let itemID = $(event.target).attr("id");

  itemID = trimForID(itemID);

  API.getMenuItem(itemID).then(function (menuItem, err) {

    clearPreviousModsIfExists();
    generateModifications(menuItem[0].mods);

    newItem.name = menuItem[0].name;
    newItem.station = menuItem[0].station;
    newItem.mods = menuItem[0].mods;
    newItem.highlight = menuItem[0].highlight;
    newItem.averageTime = menuItem[0].averageTime;

  });

})

function clearPreviousModsIfExists() {
  modsToSend.length = 0;

  if ($(".new-mod").length) {
    console.log("does exist");
    $(".new-mod").remove();
  }
  else {
    console.log("does NOT exist");
  }
}

function generateModifications(mods) {

  const modsArray = mods.split(",");

  const $newMods = $("<div>").addClass("new-mod");
  const $header = $("<h6>").text("Select Modifications");
  $newMods.append($header);

  for (let i = 0; i < modsArray.length; i++) {

    let $div = $("<div>").addClass("form-check");

    let $input = $("<input>").addClass("form-check-input");
    $input.attr("type", "checkbox");
    $input.attr("id", `mod-${i}`);

    let $label = $("<label>").addClass("form-check-label");
    $label.attr("for", `mod-${i}`);
    $label.text(modsArray[i]);

    $div.append($input);
    $div.append($label);

    $newMods.append($div);
  }

  $mods.append($newMods);



}

function trimForID(textID) {

  textID = textID.split("-");
  const id = parseInt(textID[textID.length - 1]);

  return id;

};

$mods.click(function (event) {

  const $target = $(event.target);


  const modID = trimForID($target.attr("id")) + 1;
  console.log(modID);

  console.log(event.currentTarget.childNodes[1].childNodes[modID].childNodes[0].checked);

  const active = event.currentTarget.childNodes[1].childNodes[modID].childNodes[0].checked;

  if (active) {
    addModIfNull(event.currentTarget.childNodes[1].childNodes[modID].childNodes[1].textContent);
  }
  else {
    removeModIfExists(event.currentTarget.childNodes[1].childNodes[modID].childNodes[1].textContent);
  }

})



function addModIfNull(mod) {

  modsToSend.push(mod);

  console.log(modsToSend);

}

function removeModIfExists(mod) {

  const index = modsToSend.indexOf(mod);

  modsToSend.splice(index, 1);

  console.log(modsToSend);

}

$sendToItemDB.click(function (event) {

  console.log("Sending");

  if (modsToSend.length > 0) {
    let modsToSend_Str = modsToSend.join(",");
    newItem.mods = modsToSend_Str;
  }
  else {
    newItem.mods = "";
  }

  newItem.orderNumber = $("#order-number").val();

  if (newItem.name) {
    console.log(newItem);
    console.log("^^^ newItem");
    console.log("------------");
    API.setMenuItem(newItem);
  }

  console.log("Sent?  Check ITEM DB");

  clearPreviousModsIfExists();


});

$reset.click(function (event) {
  location.reload();
})