const PersonOrganisationseinheit = require("../model/personOrganisationseinheit.model.js");

//Create and Save a new Entry
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Entry
    const personOrganisationseinheit = new PersonOrganisationseinheit({
        person_id: req.body.person_id,
        organisationseinheit_id: req.body.organisationseinheit_id,
    });

    PersonOrganisationseinheit.create(personOrganisationseinheit, (err, data) => {
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
    PersonOrganisationseinheit.getAll((err, data) => {
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
    PersonOrganisationseinheit.findByPerson(req.params.person_id, (err, data) => {
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

exports.findByOrganisationseinheit = (req, res) => {
    PersonOrganisationseinheit.findByOrganisationseinheit(req.params.organisationseinheit_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with organisationseinheit_id ${req.params.organisationseinheit_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving entry with organisationseinheit_id " + req.params.organisationseinheit_id
                });
            }
        } else return res.send(data);
    });
};

exports.findCombination = (req, res) => {
    PersonOrganisationseinheit.findCombination(req.params.person_id, req.params.organisationseinheit_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person with Organisationseinheit."
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

    const personOrganisationseinheit = new PersonOrganisationseinheit({
        person_id: req.body.person_id,
        organisationseinheit_id: req.body.organisationseinheit_id,
    });

    PersonOrganisationseinheit.update(
        req.params.person_id,
        req.params.organisationseinheit_id,
        personOrganisationseinheit,

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found person_id ${req.params.person_id} and organisationseinheit_id ${req.params.organisationseinheit_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating person_id " + req.params.person_id + " and organisationseinheit_id " + req.params.organisationseinheit_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PersonOrganisationseinheit.remove(req.params.person_id, req.params.organisationseinheit_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with person_id ${req.params.person_id} and organisationseinheit_id ${req.params.organisationseinheit_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete entry with person_id " + req.params.person_id + " and organisationseinheit_id " + req.params.organisationseinheit_id
                });
            }
        } else {
            return res.send({ message: `Entry was deleted successfully!` });
        }
    });
};