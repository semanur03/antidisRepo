const Gremium = require("../model/gremium.model.js");

//Create and Save a new Gremium
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Gremium
    const gremium = new Gremium({
        gremium: req.body.gremium,
    });

    Gremium.create(gremium, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating Gremium"
            });
        else res.send(data);
    });
};

// Retrieve all Gremium from the database.
exports.findAll = (req, res) => {
    Gremium.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Gremium."
            });
        else res.send(data);
    });
};

// Find a single Gremium with a gremium_id
exports.findOne = (req, res) => {
    Gremium.findById(req.params.gremiumId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Gremium with id ${req.params.gremiumId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Gremium with id " + req.params.gremiumId
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

    const gremium = new Gremium({
        gremium: req.body.gremium,
    });

    Gremium.updateById( req.params.gremiumId, gremium, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Gremium with id ${req.params.gremiumId}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Gremium with Id " + req.params.gremiumId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Gremium.remove(req.params.gremiumId, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Gremium with id ${req.params.gremiumId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Gremium with id " + req.params.gremiumId
                });
            }
        } else res.send({ message: `Gremium was deleted succesfully!`});
    });
};