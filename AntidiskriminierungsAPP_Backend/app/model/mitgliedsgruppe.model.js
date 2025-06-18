const sql = require("../db/webDaten.js")

// constructor
const Mitgliedsgruppe = function(mitgliedsgruppe) {
    this.mitgliedsgruppe = mitgliedsgruppe.mitgliedsgruppe;
};

Mitgliedsgruppe.create = (newMitgliedsgruppe, result) => {
    const query = `
    INSERT INTO 
        mitgliedsgruppe (mitgliedsgruppe)
    VALUES 
        (?)
    `;

    const values = [
        newMitgliedsgruppe.mitgliedsgruppe,
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating Mitgliedsgruppe: ", err);
            return result(err, null);
        }
        
        console.log("Succesfully created Mitgliedsgruppe with Id:", this.lastID);
        return result(null, {
            id: this.lastID,
            mitgliedsgruppe: newMitgliedsgruppe.mitgliedsgruppe,
        });
    });
};

Mitgliedsgruppe.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        gremium
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving all Mitgliedsgruppe: ", err)
            result(err, null);
            return;
        }

        console.log("All Mitgliedsgruppe: ", res);
        result(null, res);
    });
};

Mitgliedsgruppe.findById = (mitgliedsgruppeId, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        mitgliedsgruppe 
    WHERE 
        id = ?
    `;

    sql.get(query, [mitgliedsgruppeId], (err, res) => {
        if (err) {
            console.log("Error while retrieving Mitgliedsgruppe with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found Mitgliedsgruppe: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Mitgliedsgruppe.updateById = (id, mitgliedsgruppe, result) => {
    const query = `
    UPDATE 
        mitgliedsgruppe 
    SET 
        mitgliedsgruppe = ?
    WHERE 
        id = ?
    `;

    const values = [
        mitgliedsgruppe.mitgliedsgruppe,
        id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating Mitgliedsgruppe: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Mitgliedsgruppe with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated mitgliedsgruppe: ", { id: id, ...mitgliedsgruppe });
        result(null, { id: id, ...mitgliedsgruppe });
    });
};

Mitgliedsgruppe.remove = (id, result) => {
    const query = `
    DELETE FROM 
        mitgliedsgruppe 
    WHERE 
        id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting Mitgliedsgruppe: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Mitgliedsgruppe with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted mitgliedsgruppe with id: ", id);
        result(null, { message: "succesfully deleted mitgliedsgruppe"});
    });
};

module.exports = Mitgliedsgruppe;