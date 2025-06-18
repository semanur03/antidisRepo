const PersonSprache = require("../model/personSprache.model.js");

//Create and Save a new Entry
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Entry
    const personSprache = new PersonSprache({
        personId: req.body.personId,
        spracheId: req.body.spracheId,
    });

    PersonSprache.create(personSprache, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating an Entry"
            });
        else res.send(data);
    });
};

// Retrieve all Entries from the database.
exports.findAll = (req, res) => {
    PersonSprache.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving all Entries."
            });
        else res.send(data);
    });
};

// Find Entries with  person_id
exports.findByPerson = (req, res) => {
    PersonSprache.findByPerson(req.params.personId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found entry with person_id ${req.params.personId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving entry with person_id " + req.params.personId
                });
            }
        } else res.send(data);
    });
};

exports.findBySprache = (req, res) => {
    PersonSprache.findBySprache(req.params.spracheId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found entry with sprache_id ${req.params.spracheId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving entry with sprache_id " + req.params.spracheId
                });
            }
        } else res.send(data);
    });
};

exports.findCombination = (req, res) => {
    PersonSprache.findCombination(req.params.personId, req.params.spracheId, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person with Sprache."
            });
        } else res.send(data);
    });
};


exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const personSprache = new PersonSprache({
        personId: req.body.personId,
        spracheId: req.body.spracheId,
    });

    PersonSprache.update(
        req.params.personId,
        req.params.spracheId,
        personSprache,

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found person_id ${req.params.personId} and sprache_id ${req.params.spracheId}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating person_id " + req.params.personId + " and sprache_id " + req.params.spracheId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PersonSprache.remove(req.params.personId, req.params.spracheId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found entry with person_id ${req.params.personId} and sprache_id ${req.params.spracheId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete entry with person_id " + req.params.personId + " and sprache_id " + req.params.spracheId
                });
            }
        } else {
            res.send({ message: `Entry was deleted successfully!` });
        }
    });
};