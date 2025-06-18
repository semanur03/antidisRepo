const sql = require("../db/webDaten.js")

// constructor
const Gremium = function(gremium) {
    this.gremium = gremium.gremium;
};

Gremium.create = (newGremium, result) => {
    const query = `
    INSERT INTO 
        gremium (gremium)
    VALUES 
        (?)
    `;

    const values = [
        newGremium.gremium,
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating Gremium: ", err);
            return result(err, null);
        }
        
        console.log("Succesfully created Gremium with Id:", this.lastID);
        return result(null, {
            id: this.lastID,
            gremium: newGremium.gremium,
        });
    });
};

Gremium.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        gremium
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving all Gremium: ", err)
            result(err, null);
            return;
        }

        console.log("All Gremium: ", res);
        result(null, res);
    });
};

Gremium.findById = (gremiumId, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        gremium 
    WHERE 
        id = ?
    `;

    sql.get(query, [gremiumId], (err, res) => {
        if (err) {
            console.log("Error while retrieving Gremium with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found Gremium: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Gremium.updateById = (id, gremium, result) => {
    const query = `
    UPDATE 
        gremium 
    SET 
        gremium = ?
    WHERE 
        id = ?
    `;

    const values = [
        gremium.gremium,
        id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating Gremium: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Gremium with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated gremium: ", { id: id, ...gremium });
        result(null, { id: id, ...gremium });
    });
};

Gremium.remove = (id, result) => {
    const query = `
    DELETE FROM 
        gremium 
    WHERE 
        id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting Gremium: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Gremium with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted gremium with id: ", id);
        result(null, { message: "succesfully deleted gremium"});
    });
};

module.exports = Gremium;