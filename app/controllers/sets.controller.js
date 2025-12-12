const db = require("../models");
const Set = db.sets;
const Op = db.Sequelize.Op;

// Create and save a new set
exports.create = (req, res) => {
    // Validate request
    if(!req.body.weight || !req.body.repetitions){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const set = {
        weight: req.body.weight,
        repetitions: req.body.repetitions,
        exerciseID: req.body.exerciseID,
        userID: req.body.userID
    };

    // Save Set in the database
    Set.create(set)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Set."
            });
        });
};

// Retrieve all sets from the database
exports.findAll = (req, res) => {
    const setID = req.query.setID;
    var condition = setID ? { setID: { [Op.like]: `%${setID}` } } : null;

    Set.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occured while retrieving sets"
            });
        });
};

// Find a single set with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Set.findByPk(id)
        .then(data => {
            if(data){
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Set with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Set with id" + id + ", " + err
            });
        });
};

// Update a Set by the id of the request
exports.update = (req, res) => {
    const id = req.params.id;

    Set.update(req.body, {
        where: { setID: id }
    })
    .then(num => {
        if(num[0] === 1){
            res.send({
                message: "Set was updated successfully"
            });
        } else {
            res.send({
                message: `Cannot update Set with id=${id}. Maybe Set not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Set with id=" + id
        });
    });
};

exports.delete = (req, res) => {
    const set = req.params.id;

    Set.destroy({
        where: { setID: id }
    })
    .then(num => {
        if(num === 1){
            res.send({
                message: `Set ${id} deleted!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Set with id=" + id + ", "
        });
    });
};

exports.deleteAll = (req, res) => {
    Set.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Sets were deleted successfully`});
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured while removing all exercises."
        })
    })
};