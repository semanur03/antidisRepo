const Organisationseinheit = require("../model/organisationseinheit.model.js");

//Create and Save a new Organisationseinheit
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Organisationseinheit
    const organisationseinheit = new Organisationseinheit({
        organisationseinheit: req.body.organisationseinheit,
    });

    Organisationseinheit.create(organisationseinheit, (err, data) => {
        if(err)
            return res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating Organisationseinheit"
            });
        else res.send(data);
    });
};

// Retrieve all Organisationseinheit from the database.
exports.findAll = (req, res) => {
    Organisationseinheit.getAll((err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Organisationseinheit."
            });
        else return res.send(data);
    });
};

// Find a single Organisationseinheit with a organisationseinheit_id
exports.findOne = (req, res) => {
    Organisationseinheit.findById(req.params.organisationseinheit_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Organisationseinheit with id ${req.params.organisationseinheit_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving Organisationseinheit with id " + req.params.organisationseinheit_id
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

    const organisationseinheit = new Organisationseinheit({
        organisationseinheit: req.body.organisationseinheit,
    });

    Organisationseinheit.updateById( req.params.organisationseinheit_id, organisationseinheit, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found Organisationseinheit with id ${req.params.organisationseinheit_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating Organisationseinheit with Id " + req.params.organisationseinheit_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Organisationseinheit.remove(req.params.organisationseinheit_id, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Organisationseinheit with id ${req.params.organisationseinheit_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete Organisationseinheit with id " + req.params.organisationseinheit_id
                });
            }
        } else return res.send({ message: `Organisationseinheit was deleted succesfully!`});
    });
};