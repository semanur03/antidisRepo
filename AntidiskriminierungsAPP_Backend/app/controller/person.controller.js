const Person = require("../model/person.model.js");

//Create and Save a new Person
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Person
    const person = new Person({
        titel: req.body.titel,
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        telefon: req.body.telefon,
        email:req.body.email,
    });

    Person.create(person, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating Person"
            });
        else res.send(data);
    });
};

// Retrieve all Person from the database.
exports.findAll = (req, res) => {
    Person.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person."
            });
        else res.send(data);
    });
};

// Find a single Person with a person_id
exports.findOne = (req, res) => {
    Person.findById(req.params.personId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with id ${req.params.personId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Person with id " + req.params.personId
                });
            }
        } else res.send(data);
    });
};

exports.getAllJoin = (req, res) => {
    Person.getAllJoin((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Person."
            });
        else res.send(data);
    });
};

exports.update = (req, res) => {
    //Validate Request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const person = new Person({
        titel: req.body.titel,
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        telefon: req.body.telefon,
        email: req.body.email,
    });

    Person.updateById(
        req.params.personId,
        person,

        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Person with id ${req.params.personId}`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Person with Id " + req.params.personId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Person.remove(req.params.personId, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with id ${req.params.personId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Person with id " + req.params.personId
                });
            }
        } else res.send({ message: `Person was deleted succesfully!`});
    });
};


exports.findBySprache = (req, res) => {
    Person.findBySprache(req.params.personSprache, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with sprache ${req.params.personSprache}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Person with sprache " + req.params.personSprache
                });
            }
        } else res.send(data);
    });
};

exports.findByGremium = (req, res) => {
    Person.findByGremium(req.params.personGremium, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with gremium ${req.params.personGremium}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Person with gremium " + req.params.personGremium
                });
            }
        } else res.send(data);
    });
};

exports.findByMitgliedsgruppe = (req, res) => {
    Person.findByMitgliedsgruppe(req.params.personMitgliedsgruppe, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with mitgliedsgruppe ${req.params.personMitgliedsgruppe}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Person with mitgliedsgruppe " + req.params.personMitgliedsgruppe
                });
            }
        } else res.send(data);
    });
};

exports.findByOrganisationseinheit = (req, res) => {
    Person.findByOrganisationseinheit(req.params.personOrganisationseinheit, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Person with organisationseinheit ${req.params.personOrganisationseinheit}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Person with organisationseinheit " + req.params.personOrganisationseinheit
                });
            }
        } else res.send(data);
    });
};