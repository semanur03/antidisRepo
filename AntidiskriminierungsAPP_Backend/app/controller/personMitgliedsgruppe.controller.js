const PersonMitgliedsgruppe = require("../model/personMitgliedsgruppe.model.js");

//Create and Save a new Entry
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Entry
    const personMitgliedsgruppe = new PersonMitgliedsgruppe({
        person_id: req.body.person_id,
        mitgliedsgruppe_id: req.body.mitgliedsgruppe_id_id,
    });

    PersonMitgliedsgruppe.create(personMitgliedsgruppe, (err, data) => {
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
    PersonMitgliedsgruppe.getAll((err, data) => {
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
    PersonMitgliedsgruppe.findByPerson(req.params.person_id, (err, data) => {
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

exports.findByMitgliedsgruppe = (req, res) => {
    PersonMitgliedsgruppe.findByMitgliedsgruppe(req.params.mitgliedsgruppe_idid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with mitgliedsgruppe_id ${req.params.mitgliedsgruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving entry with mitgliedsgruppe_id " + req.params.mitgliedsgruppe_id
                });
            }
        } else return res.send(data);
    });
};

exports.findCombination = (req, res) => {
    PersonMitgliedsgruppe.findCombination(req.params.person_id, req.params.mitgliedsgruppe_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person with Mitgliedsgruppe."
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

    const personMitgliedsgruppe = new PersonMitgliedsgruppe({
        person_id: req.body.person_id,
        mitgliedsgruppe_id: req.body.mitgliedsgruppe_id,
    });

    PersonMitgliedsgruppe.update(
        req.params.person_id,
        req.params.mitgliedsgruppe_id,
        personMitgliedsgruppe,

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found person_id ${req.params.person_id} and mitgliedsgruppe_id ${req.params.mitgliedsgruppe_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating person_id " + req.params.person_id + " and mitgliedsgruppe_id " + req.params.mitgliedsgruppe_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PersonMitgliedsgruppe.remove(req.params.person_id, req.params.mitgliedsgruppe_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with person_id ${req.params.person_id} and mitgliedsgruppe_id ${req.params.mitgliedsgruppe_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete entry with person_id " + req.params.person_id + " and mitgliedsgruppe_id " + req.params.mitgliedsgruppe_id
                });
            }
        } else {
            return res.send({ message: `Entry was deleted successfully!` });
        }
    });
};