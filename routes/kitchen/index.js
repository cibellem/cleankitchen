//Route for /kitchen

const router = require("express").Router();

router.use("/expo", require("./expo"));
router.use("/station", require("./station"));


router.get("/", function (req, res) {
    res.send("Getting /kitchen route");
});

module.exports = router;