//Route for /api

const router = require("express").Router();

router.use("/items", require("./items"));
router.use("/menu", require("./menu"));

router.get("/", function(req, res){
    res.send("Getting /api route");
});

module.exports = router;