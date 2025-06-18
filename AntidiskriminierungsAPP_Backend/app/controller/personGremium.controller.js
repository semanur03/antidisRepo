const PersonGremium = require("../model/personGremium.model.js");

//Create and Save a new Entry
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Entry
    const personGremium = new PersonGremium({
        person_id: req.body.person_id,
        gremium_id: req.body.gremium_id,
    });

    PersonGremium.create(personGremium, (err, data) => {
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
    PersonGremium.getAll((err, data) => {
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
    PersonGremium.findByPerson(req.params.person_id, (err, data) => {
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

exports.findByGremium = (req, res) => {
    PersonGremium.findByGremium(req.params.gremium_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with gremium_id ${req.params.gremium_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving entry with gremium_id " + req.params.gremium_id
                });
            }
        } else return res.send(data);
    });
};

exports.findCombination = (req, res) => {
    PersonGremium.findCombination(req.params.person_id, req.params.gremium_id, (err, data) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person with Gremium."
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

    const personGremium = new PersonGremium({
        person_id: req.body.person_id,
        gremium_id: req.body.gremium_id,
    });

    PersonGremium.update(
        req.params.person_id,
        req.params.gremium_id,
        personGremium,

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found person_id ${req.params.person_id} and gremium_id ${req.params.gremium_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating person_id " + req.params.person_id + " and gremiume_id " + req.params.gremium_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    PersonGremium.remove(req.params.person_id, req.params.gremium_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found entry with person_id ${req.params.person_id} and gremium_id ${req.params.gremium_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete entry with person_id " + req.params.person_id + " and gremium_id " + req.params.gremium_id
                });
            }
        } else {
            return res.send({ message: `Entry was deleted successfully!` });
        }
    });
};