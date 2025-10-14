module.exports = app => {
    const exercises = require("../controllers/exercise.controller.js");

    var router = require("express").Router();

    // Create a new Exercise
    router.post("/", exercises.create);

    // Retrieve all Exercises
    router.get("/", exercises.findAll);

    // Retrieve a single exercise
    router.get("/:id", exercises.findOne);

    // Update an Exercise with id
    router.put("/:id", exercises.update);

    // Delete an Exercise with id
    router.delete("/:id", exercises.delete);

    app.use('/api/exercises', router);
}