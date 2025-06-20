const sql = require("../db/webDaten.js")

// constructor
const Organisationseinheit = function(organisationseinheit) {
    this.organisationseinheit = organisationseinheit.organisationseinheit;
};

Organisationseinheit.create = (newOrganisationseinheit, result) => {
    const query = `
    INSERT INTO 
        organisationseinheit (organisationseinheit)
    VALUES 
        (?)
    `;

    const values = [
        newOrganisationseinheit.organisationseinheit,
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating Organisationseinheit: ", err);
            return result(err, null);
        }
        
        console.log("Succesfully created Organisationseinheit with Id:", this.lastID);
        return result(null, {
            id: this.lastID,
            organisationseinheit: newOrganisationseinheit.organisationseinheit,
        });
    });
};

Organisationseinheit.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        organisationseinheit
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving all Organisationseinheit: ", err)
            result(err, null);
            return;
        }

        console.log("All SprOrganisationseinheitache: ", res);
        result(null, res);
    });
};

Organisationseinheit.findById = (organisationseinheitId, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        organisationseinheit 
    WHERE 
        id = ?
    `;

    sql.get(query, [organisationseinheitId], (err, res) => {
        if (err) {
            console.log("Error while retrieving Organisationseinheit with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found Organisationseinheit: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Organisationseinheit.updateById = (id, organisationseinheit, result) => {
    const query = `
    UPDATE 
        organisationseinheit 
    SET 
        organisationseinheit = ?
    WHERE 
        id = ?
    `;

    const values = [
        organisationseinheit.organisationseinheit,
        id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating Organisationseinheit: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Organisationseinheit with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated organisationseinheit: ", { id: id, ...organisationseinheit });
        result(null, { id: id, ...organisationseinheit });
    });
};

Organisationseinheit.remove = (id, result) => {
    const query = `
    DELETE FROM 
        organisationseinheit 
    WHERE 
        id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting Organisationseinheit: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Organisationseinheit with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted organisationseinheit with id: ", id);
        result(null, { message: "succesfully deleted organisationseinheit"});
    });
};

module.exports = Organisationseinheit;