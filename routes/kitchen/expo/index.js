//route for /kitchen/expo

const router = require("express").Router();

//Accessing the Models folder
var db = require('../../../models/');

//Get route
router.get("/", function (req, res) {
    db.items.findAll({
    }).then(function (data) {

        const item = {
            items: filterByTable(data),
            layout: "kitchen"
        }
        res.render("expo", item);
    })


});

function filterByTable(data) {

    const itemsByOrder = {};

    data.forEach(item => {

        if (itemsByOrder["order" + item.dataValues.orderNumber] == undefined) {
            itemsByOrder["order" + item.dataValues.orderNumber] = [];
        }

        modPackages = [];

        const spreadMods = spreadModsToArray(item.dataValues.mods);
        const styles = styleMods(spreadMods);

        for (let i = 0; i < spreadMods.length; i++) {
            iModPackage = {
                modText: spreadMods[i],
                modStyles: styles[i]
            }

            modPackages.push(iModPackage);
        }

        item.dataValues.modPackage = modPackages;


        itemsByOrder["order" + item.dataValues.orderNumber].push(item.dataValues);

    });

    const itemsByOrder_Array = [];

    for (const key in itemsByOrder) {
        itemsByOrder_Array.push(itemsByOrder[key]);
    }

    return itemsByOrder_Array;

};

function spreadModsToArray(mods) {
    const modsArray = mods.split(",");

    return modsArray;
}

function styleMods(mods) {

    const modStylesArray = [];

    for (let i = 0; i < mods.length; i++) {

        const mod = mods[i];

        const modSplit = mod.split(" ");

        let isModStyle = false;

        modSplit.forEach(word => {

            switch (word) {
                case "no":
                    if (isModStyle) {
                        modStylesArray[i] += "text-warning";
                    }
                    else {
                        modStylesArray.push("text-warning");
                        isModStyle = true;
                    }
                    break;
                case "extra":
                    if (isModStyle) {
                        modStylesArray[i] += "text-success";
                    }
                    else {
                        modStylesArray.push("text-success");
                        isModStyle = true;
                    }
                    break;
                case "ALERGY":
                    if (isModStyle) {
                        modStylesArray[i] += "text-danger";
                    }
                    else {
                        modStylesArray.push("text-danger");
                        isModStyle = true;
                    }
                    break;
                default:
                    break;
            };

            if (!isModStyle) {
                modStylesArray.push("");
                isModStyle = true;
            }
        })
    }

    return modStylesArray;

}


//logic about the mods

module.exports = router;
