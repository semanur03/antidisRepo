const Mitgliedsgruppe = require("../model/mitgliedsgruppe.model.js");

//Create and Save a new Mitgliedsgruppe
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Mitgliedsgruppe
    const mitgliedsgruppe = new Mitgliedsgruppe({
        mitgliedsgruppe: req.body.mitgliedsgruppe,
    });

    GremMitgliedsgruppeium.create(mitgliedsgruppe, (err, data) => {
        if(err)
            return res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating Mitgliedsgruppe"
            });
        else res.send(data);
    });
};

// Retrieve all Mitgliedsgruppe from the database.
exports.findAll = (req, res) => {
    Mitgliedsgruppe.getAll((err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Mitgliedsgruppe."
            });
        else return res.send(data);
    });
};

// Find a single Mitgliedsgruppe with a mitgliedsgruppe_id
exports.findOne = (req, res) => {
    Mitgliedsgruppe.findById(req.params.mitgliedsgruppe_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Mitgliedsgruppe with id ${req.params.mitgliedsgruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving Mitgliedsgruppe with id " + req.params.mitgliedsgruppe_id
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

    const mitgliedsgruppe = new Mitgliedsgruppe({
        mitgliedsgruppe: req.body.mitgliedsgruppe,
    });

    Mitgliedsgruppe.updateById( req.params.mitgliedsgruppe_id, mitgliedsgruppe, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found Mitgliedsgruppe with id ${req.params.mitgliedsgruppe_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating Mitgliedsgruppe with Id " + req.params.mitgliedsgruppe_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Mitgliedsgruppe.remove(req.params.mitgliedsgruppe_id, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Mitgliedsgruppe with id ${req.params.mitgliedsgruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete Mitgliedsgruppe with id " + req.params.mitgliedsgruppe_id
                });
            }
        } else return res.send({ message: `Mitgliedsgruppe was deleted succesfully!`});
    });
};