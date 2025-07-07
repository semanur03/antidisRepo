const PersonMitgliedergruppe = require("../model/personMitgliedergruppe.model.js");

//Create and Save a new Entry
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Entry
    const personMitgliedergruppe = new PersonMitgliedergruppe({
        person_id: req.body.person_id,
        mitgliedergruppe_id: req.body.mitgliedergruppe_id,
    });

    PersonMitgliedergruppe.create(personMitgliedergruppe, (err, data) => {
        if(err)
            return res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating an Entry"
            });
        else res.send(data);
    });
};

// Retrieve all Entries from the database.
exports.findAll = (req, res) => {
    PersonMitgliedergruppe.getAll((err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all Entries."
            });
        else return res.send(data);
    });
};

// Find Entries with  person_id
exports.findByPerson = (req, res) => {
    PersonMitgliedergruppe.findByPerson(req.params.person_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with person_id ${req.params.person_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving entry with person_id " + req.params.person_id
                });
            }
        } else return res.send(data);
    });
};

exports.findByMitgliedergruppe = (req, res) => {
    PersonMitgliedergruppe.findByMitgliedergruppe(req.params.mitgliedergruppe_idid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with mitgliedergruppe_id ${req.params.mitgliedergruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving entry with mitgliedergruppe_id " + req.params.mitgliedergruppe_id
                });
            }
        } else return res.send(data);
    });
};

exports.findCombination = (req, res) => {
    PersonMitgliedergruppe.findCombination(req.params.person_id, req.params.mitgliedergruppe_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person with Mitgliedergruppe."
            });
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

    const personMitgliedergruppe = new PersonMitgliedergruppe({
        person_id: req.body.person_id,
        mitgliedergruppe_id: req.body.mitgliedergruppe_id,
    });

    PersonMitgliedergruppe.update(
        req.params.person_id,
        req.params.mitgliedergruppe_id,
        personMitgliedergruppe,

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found person_id ${req.params.person_id} and mitgliedergruppe_id ${req.params.mitgliedergruppe_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating person_id " + req.params.person_id + " and mitgliedergruppe_id " + req.params.mitgliedergruppe_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PersonMitgliedergruppe.remove(req.params.person_id, req.params.mitgliedergruppe_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with person_id ${req.params.person_id} and mitgliedergruppe_id ${req.params.mitgliedergruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete entry with person_id " + req.params.person_id + " and mitgliedergruppe_id " + req.params.mitgliedergruppe_id
                });
            }
        } else {
            return res.send({ message: `Entry was deleted successfully!` });
        }
    });
};