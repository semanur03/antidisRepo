const Mehrsprachigkeit = require("../model/mehrsprachigkeit.model.js");

//Create and Save a new Mehrsprachigkeit
exports.create = (req, res) => {
    //Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty"
        })
    }

    //Create a new Mehrsprachigkeit
    const mehrsprachigkeit = new Mehrsprachigkeit({
        id: req.body.id,
        deutsch: req.body.deutsch,
        englisch: req.body.englisch
    });

    Mehrsprachigkeit.create(mehrsprachigkeit, (err, data) => {
        if(err)
            return res.status(500).send({
                message: 
                    err.message || "Some error occureed while creating Mehrsprachigkeit"
            });
        else res.send(data);
    });
};

// Retrieve all Mehrsprachigkeit from the database.
exports.findAll = (req, res) => {
    Mehrsprachigkeit.getAll((err, data) => {
        if (err)
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Mehrsprachigkeit."
            });
        else return res.send(data);
    });
};

// Find a single Mehrsprachigkeit with a mehrsprachigkeit_id
exports.findOne = (req, res) => {
    Mehrsprachigkeit.findById(req.params.mehrsprachigkeit_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Mehrsprachigkeit with id ${req.params.mehrsprachigkeit_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving Mehrsprachigkeit with id " + req.params.mehrsprachigkeit_id
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

    const mehrsprachigkeit = new Mehrsprachigkeit({
        id: req.body.id,
        deutsch: req.body.deutsch,
        englisch: req.body.englisch
    });

    Mehrsprachigkeit.updateById( req.params.mehrsprachigkeit_id, mehrsprachigkeit, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found Mehrsprachigkeit with id ${req.params.mehrsprachigkeit_id}`
                    });
                } else {
                    return res.status(500).send({
                        message: "Error updating Mehrsprachigkeit with Id " + req.params.mehrsprachigkeit_id
                    });
                }
            } else return res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Mehrsprachigkeit.remove(req.params.mehrsprachigkeit_id, (err, data) => {
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found Mehrsprachigkeit with id ${req.params.mehrsprachigkeit_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Could not delete Mehrsprachigkeit with id " + req.params.mehrsprachigkeit_id
                });
            }
        } else return res.send({ message: `Mehrsprachigkeit was deleted succesfully!`});
    });
};

exports.findByLanguage = (req, res) => {
    const lang = req.params.lang;

    Mehrsprachigkeit.findByLanguage(lang, (err, data) => {
        if (err) {
            if (err.kind === "invalid_language") {
                return res.status(400).send({
                    message: `Unsupported language '${lang}'. Use 'de' or 'en'.`
                });
            } else {
                return res.status(500).send({
                    message: `Error retrieving Mehrsprachigkeit for language ${lang}`
                });
            }
        } else return res.send(data);
    });
};

exports.findByIdAndLanguage = (req, res) => {
    const id = req.params.id;
    const lang = req.params.lang;

    Mehrsprachigkeit.findByIdAndLanguage(id, lang, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `No translation entry found for id '${id}'.`
                });
            } else {
                return res.status(500).send({
                    message: `Error retrieving translation for id '${id}' and language '${lang}'`
                });
            }
        } else return res.send(data);
    });
};
