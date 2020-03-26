//route for kitchen/station

const router = require("express").Router();

var db = require('../../../models/');

router.get("/:id", function (req, res) {
    db.items.findAll({
        where: {
            station: req.params.id
        }
    }).then(function (data) {
        const items = seperateItemsByProgress(data);
        const item = {
            ...items,
            layout: "kitchen",
            station : req.params.id

        }
        res.render("station", item);
    })
});
function seperateItemsByProgress(items_db) {
    var items = {
        NotStarted: [],
        Working: [],
        Finished: []
    }

    items_db.forEach(item => {

        switch (item.status) {
            case ("not started"):
                items.NotStarted.push(item);
                break;
            case ("working"):
                items.Working.push(item);
                break;
            case ("finished"):
                items.Finished.push(item);
                break;
            default:
                break;
        }
    });

    return items;
}



router.get("/:id/recall", function (req, res) {
    db.items.findAll({

        where: {
            status: "finished"
        }
    }).then(function (data) {
        const item = {
            items: data,
            layout: "kitchen",
            station : req.params.id

        }
        res.render("recallOrder", item);
    })

});
module.exports = router;


