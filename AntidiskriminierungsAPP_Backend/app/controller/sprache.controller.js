const Sprache = require("../model/sprache.model.js");

//Create and Save a new Sprache
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Sprache
    const sprache = new Sprache({
        sprache: req.body.sprache,
    });

    Sprache.create(sprache, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating Sprache"
            });
        else res.send(data);
    });
};

// Retrieve all Sprache from the database.
exports.findAll = (req, res) => {
    Sprache.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Sprache."
            });
        else res.send(data);
    });
};

// Find a single Sprache with a sprache_id
exports.findOne = (req, res) => {
    Sprache.findById(req.params.spracheId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sprache with id ${req.params.spracheId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Sprache with id " + req.params.spracheId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const sprache = new Sprache({
        sprache: req.body.sprache,
    });

    Sprache.updateById( req.params.spracheId, sprache, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Sprache with id ${req.params.spracheId}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Sprache with Id " + req.params.spracheId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Sprache.remove(req.params.spracheId, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Sprache with id ${req.params.spracheId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Sprache with id " + req.params.spracheId
                });
            }
        } else res.send({ message: `Sprache was deleted succesfully!`});
    });
};