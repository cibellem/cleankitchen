//Route for main

const router = require("express").Router();

//Accessing the Models folder
var db = require('../models');

router.use("/api", require("./api"));
router.use("/kitchen", require("./kitchen"));

//Get route
router.get("/", function (req, res) {
    db.menus.findAll({
    }).then(function (data) {

        const menus = {
            menu: data,
            layout: "server"
        }
        console.log("------MAIN : Rendering main page ... ------>>>");
        console.log(`------>>> Passing in ${menus} ------>>>`);
        res.render("main", menus);
    });

});

module.exports = router;