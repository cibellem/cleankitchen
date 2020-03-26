//Route for /api/items

const router = require("express").Router();
const db = require("../../../models");

router.get("/", function (req, res) {
    db.items.findAll({}).then(function (dbItems) {
        res.json(dbItems);
    });
});

//Get all items with the passing order number.
router.get("/orderNumber/:num", function(req, res){
    db.items.findAll({
        where: {
            orderNumber : req.params.num
        }
    }).then(function(dbItems){
        res.json(dbItems);
    })
})

router.post("/", function (req, res) {

    db.items.create(req.body).then(function (dbItems) {
        res.json(dbItems)
    });

});


// DELETE route for deleting items
router.delete("/:id", function (req, res) {
    db.items.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbItems) {
        res.json(dbItems);
    });
});

//Deletes all order items
router.delete("/orderNumber/:num", function(req,res){
    db.items.destroy({
        where : {
            orderNumber : req.params.num
        }
    }).then(function(dbItems){
        res.json(dbItems);
    })
})


//update current time and status

router.put("/:id", function (req, res) {

    db.items.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        }).then(function (dbItems) {
            res.json(dbItems);
        });
});






router.get("/:id", function (req, res) {

    db.items.findAll({
        where: {
            id: req.params.id
        }

    }).then(function (dbItems) {
        res.json(dbItems);
    });

})

module.exports = router;




router.get("/:id", function (req, res) {

    db.items.findAll({
        where: {
            id: req.params.id
        }

    }).then(function (dbItems) {
        res.json(dbItems);
    });

});