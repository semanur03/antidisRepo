const Mitgliedergruppe = require("../model/mitgliedergruppe.model.js");

//Create and Save a new Mitgliedergruppe
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Mitgliedergruppe
    const mitgliedergruppe = new Mitgliedergruppe({
        mitgliedergruppe: req.body.mitgliedergruppe,
    });

    GremMitgliedergruppeium.create(mitgliedergruppe, (err, data) => {
        if(err)
            return res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating Mitgliedergruppe"
            });
        else res.send(data);
    });
};

// Retrieve all Mitgliedergruppe from the database.
exports.findAll = (req, res) => {
    Mitgliedergruppe.getAll((err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Mitgliedergruppe."
            });
        else return res.send(data);
    });
};

// Find a single Mitgliedergruppe with a mitgliedergruppe_id
exports.findOne = (req, res) => {
    Mitgliedergruppe.findById(req.params.mitgliedergruppe_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Mitgliedergruppe with id ${req.params.mitgliedergruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving Mitgliedergruppe with id " + req.params.mitgliedergruppe_id
                });
            }
        } else return res.send(data);
    });
};

exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const mitgliedergruppe = new Mitgliedergruppe({
        mitgliedergruppe: req.body.mitgliedergruppe,
    });

    Mitgliedergruppe.updateById( req.params.mitgliedergruppe_id, mitgliedergruppe, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found Mitgliedergruppe with id ${req.params.mitgliedergruppe_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating Mitgliedergruppe with Id " + req.params.mitgliedergruppe_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Mitgliedergruppe.remove(req.params.mitgliedergruppe_id, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Mitgliedergruppe with id ${req.params.mitgliedergruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete Mitgliedergruppe with id " + req.params.mitgliedergruppe_id
                });
            }
        } else return res.send({ message: `Mitgliedergruppe was deleted succesfully!`});
    });
};