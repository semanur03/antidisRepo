const PersonSprache = require("../model/personSprache.model.js");

//Create and Save a new Entry
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Entry
    const personSprache = new PersonSprache({
        person_id: req.body.person_id,
        sprache_id: req.body.sprache_id,
    });

    PersonSprache.create(personSprache, (err, data) => {
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
    PersonSprache.getAll((err, data) => {
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
    PersonSprache.findByPerson(req.params.person_id, (err, data) => {
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

exports.findBySprache = (req, res) => {
    PersonSprache.findBySprache(req.params.sprache_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with sprache_id ${req.params.sprache_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving entry with sprache_id " + req.params.sprache_id
                });
            }
        } else return res.send(data);
    });
};

exports.findCombination = (req, res) => {
    PersonSprache.findCombination(req.params.person_id, req.params.sprache_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person with Sprache."
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

    const personSprache = new PersonSprache({
        person_id: req.body.person_id,
        sprache_id: req.body.sprache_id,
    });

    PersonSprache.update(
        req.params.person_id,
        req.params.sprache_id,
        personSprache,

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found person_id ${req.params.person_id} and sprache_id ${req.params.sprache_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating person_id " + req.params.person_id + " and sprache_id " + req.params.sprache_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PersonSprache.remove(req.params.person_id, req.params.sprache_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with person_id ${req.params.person_id} and sprache_id ${req.params.sprache_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete entry with person_id " + req.params.person_id + " and sprache_id " + req.params.sprache_id
                });
            }
        } else {
            return res.send({ message: `Entry was deleted successfully!` });
        }
    });
};