const sql = require("../db/webDaten.js")

// constructor
const Sprache = function(sprache) {
    this.sprache = sprache.sprache;
};

Sprache.create = (newSprache, result) => {
    const query = `
    INSERT INTO 
        sprache (sprache)
    VALUES 
        (?)
    `;

    const values = [
        newSprache.sprache,
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating Sprache: ", err);
            return result(err, null);
        }
        
        console.log("Succesfully created Sprache with Id:", this.lastID);
        return result(null, {
            id: this.lastID,
            sprache: newSprache.sprache,
        });
    });
};

Sprache.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        sprache
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving all Sprache: ", err)
            result(err, null);
            return;
        }

        console.log("All Sprache: ", res);
        result(null, res);
    });
};

Sprache.findById = (spracheId, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        sprache 
    WHERE 
        id = ?
    `;

    sql.get(query, [spracheId], (err, res) => {
        if (err) {
            console.log("Error while retrieving Sprache with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found sprache: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Sprache.updateById = (id, sprache, result) => {
    const query = `
    UPDATE 
        sprache 
    SET 
        sprache = ?
    WHERE 
        id = ?
    `;

    const values = [
        sprache.sprache,
        id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating Sprache: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Sprache with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated sprache: ", { id: id, ...sprache });
        result(null, { id: id, ...sprache });
    });
};

Sprache.remove = (id, result) => {
    const query = `
    DELETE FROM 
        sprache 
    WHERE 
        id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting SPrache: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Sprache with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted sprache with id: ", id);
        result(null, { message: "succesfully deleted sprache"});
    });
};

module.exports = Sprache;