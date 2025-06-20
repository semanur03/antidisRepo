const sql = require("../db/webDaten.js")

// constructor
const Mehrsprachigkeit = function(mehrsprachigkeit) {
    this.id = mehrsprachigkeit.id;
    this.deutsch = mehrsprachigkeit.deutsch;
    this.englisch = mehrsprachigkeit.englisch;
};

Mehrsprachigkeit.create = (newMehrsprachigkeit, result) => {
    const query = `
    INSERT INTO 
        mehrsprachigkeit (id, deutsch, englisch)
    VALUES 
        (?, ?, ?)
    `;

    const values = [
        newMehrsprachigkeit.id,
        newMehrsprachigkeit.deutsch,
        newMehrsprachigkeit.englisch
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating Mehrsprachigkeit: ", err);
            return result(err, null);
        }
        
        console.log("Succesfully created Mehrsprachigkeit with Id:", this.lastID);
        return result(null, {
            id: this.lastID,
            mehrsprachigkeit: newMehrsprachigkeit.mehrsprachigkeit,
        });
    });
};

Mehrsprachigkeit.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        mehrsprachigkeit
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving all Mehrsprachigkeit: ", err)
            result(err, null);
            return;
        }

        console.log("All Mehrsprachigkeit: ", res);
        result(null, res);
    });
};

Mehrsprachigkeit.findById = (mehrsprachigkeitId, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        mehrsprachigkeit 
    WHERE 
        id = ?
    `;

    sql.get(query, [mehrsprachigkeitId], (err, res) => {
        if (err) {
            console.log("Error while retrieving Mehrsprachigkeit with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found Mehrsprachigkeit: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Mehrsprachigkeit.updateById = (id, mehrsprachigkeit, result) => {
    const query = `
    UPDATE 
        mehrsprachigkeit 
    SET 
        deutsch = ?, englisch = ?
    WHERE 
        id = ?
    `;

    const values = [
        mehrsprachigkeit.deutsch,
        mehrsprachigkeit.englisch,
        id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating Mehrsprachigkeit: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Mehrsprachigkeit with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated mehrsprachigkeit: ", { id: id, ...mehrsprachigkeit });
        result(null, { id: id, ...mehrsprachigkeit });
    });
};

Mehrsprachigkeit.remove = (id, result) => {
    const query = `
    DELETE FROM 
        mehrsprachigkeit 
    WHERE 
        id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting Mehrsprachigkeit: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Mehrsprachigkeit with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted mehrsprachigkeit with id: ", id);
        result(null, { message: "succesfully deleted mehrsprachigkeit"});
    });
};

Mehrsprachigkeit.findByLanguage = (lang, result) => {
    let column;

    //Determine the language column
    switch (lang.toLowerCase()) {
        case 'de':
            column = 'deutsch';
            break;
        case 'en':
            column = 'englisch';
            break;
        default:
            return result({ kind: "invalid_language" }, null);
    }

    const query = `
        SELECT 
            id, ${column} AS text 
        FROM 
            mehrsprachigkeit
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log(`Error while retrieving Mehrsprachigkeit for language ${lang}: `, err);
            result(err, null);
            return;
        }

        result(null, res);
    });
};

Mehrsprachigkeit.findByIdAndLanguage = (id, lang, result) => {
    const column = lang === 'en' ? 'englisch' : 'deutsch';

    const query = `SELECT id, ${column} AS text FROM mehrsprachigkeit WHERE id = ?`;

    sql.get(query, [id], (err, row) => {
        if (err) {
            console.log("Fehler beim Abrufen:", err);
            result(err, null);
            return;
        }

        if (row) {
            result(null, row);
        } else {
            result({ kind: "not_found" }, null);
        }
    });
};

module.exports = Mehrsprachigkeit;