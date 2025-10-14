module.exports = app => {
    const sets = require("../controllers/sets.controller.js");

    var router = require("express").Router();

    // Create a new set
    router.post("/", sets.create);

    // Get all sets
    router.get("/", sets.findAll);

    // Get a single set
    router.get("/:id", sets.findOne);

    //  Update a signle set
    router.put("/:id", sets.update);

    //Delete a set
    router.delete("/:id", sets.delete);

    app.use('/api/sets', router);
}