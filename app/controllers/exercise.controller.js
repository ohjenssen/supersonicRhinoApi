const db = require("../models");
const Exercise = db.exercises;
const Op = db.Sequelize.Op;

// Create and Save a new exercise
exports.create = (req, res) => {
    // Validate request
    if(!req.body.exerciseName){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an Exercise
    const exercise = {
        exerciseName: req.body.exerciseName
    };

    // Save Exercise in the database
    Exercise.create(exercise)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Exercise."
            });
        });

};

// Rettrieve all exercises from the database.
exports.findAll = (req, res) => {
    const exerciseName = req.query.exerciseName;
    var condition = exerciseName ? { exerciseName: { [Op.like]: `%${exerciseName}` } } : null;

    Exercise.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving exercises."
            });
        });
}

// Find a single exercise with and id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Exercise.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Exercise with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Exercise with id=" + id
            });
        });
};

// Update an exercise by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Exercise.update(req.body, {
        where: { exerciseID: id }
    })
        .then(num => {
            if(num[0] === 1){
                res.send({
                    message: "Exercise was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Exercise with id=${id}. Maybe Exercise not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Exercise with id=" + id
            });
        });
};

// Delete an exercise with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Exercise.destroy({
        where: { exerciseID: id } 
    })
        .then(num => {
            if (num === 1){
                res.send({
                    message: `Exercise ${id} deleted!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Exercise with id=" + id + ", " + err
            });
        });
};

// Delete all exercises from the database
exports.deleteAll = (req, res) => {
    Exercise.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Exercises were deleted successfully` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all exercises."
            })
        })
};