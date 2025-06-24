const sql = require("../db/webDaten.js")

// constructor
const Mitgliedergruppe = function(mitgliedergruppe) {
    this.mitgliedergruppe = mitgliedergruppe.mitgliedergruppe;
};

Mitgliedergruppe.create = (newMitgliedergruppe, result) => {
    const query = `
    INSERT INTO 
        mitgliedergruppe (mitgliedergruppe)
    VALUES 
        (?)
    `;

    const values = [
        newMitgliedergruppe.mitgliedergruppe,
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating Mitgliedergruppe: ", err);
            return result(err, null);
        }
        
        console.log("Succesfully created Mitgliedergruppe with Id:", this.lastID);
        return result(null, {
            id: this.lastID,
            mitgliedergruppe: newMitgliedergruppe.mitgliedergruppe,
        });
    });
};

Mitgliedergruppe.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        gremium
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving all Mitgliedergruppe: ", err)
            result(err, null);
            return;
        }

        console.log("All Mitgliedergruppe: ", res);
        result(null, res);
    });
};

Mitgliedergruppe.findById = (mitgliedergruppeId, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        mitgliedergruppe 
    WHERE 
        id = ?
    `;

    sql.get(query, [mitgliedergruppeId], (err, res) => {
        if (err) {
            console.log("Error while retrieving Mitgliedergruppe with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found Mitgliedergruppe: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Mitgliedergruppe.updateById = (id, mitgliedergruppe, result) => {
    const query = `
    UPDATE 
        mitgliedergruppe 
    SET 
        mitgliedergruppe = ?
    WHERE 
        id = ?
    `;

    const values = [
        mitgliedergruppe.mitgliedergruppe,
        id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating Mitgliedergruppe: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Mitgliedergruppe with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated mitgliedergruppe: ", { id: id, ...mitgliedergruppe });
        result(null, { id: id, ...mitgliedergruppe });
    });
};

Mitgliedergruppe.remove = (id, result) => {
    const query = `
    DELETE FROM 
        mitgliedergruppe 
    WHERE 
        id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting Mitgliedergruppe: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Mitgliedergruppe with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted mitgliedergruppe with id: ", id);
        result(null, { message: "succesfully deleted mitgliedergruppe"});
    });
};

module.exports = Mitgliedergruppe;