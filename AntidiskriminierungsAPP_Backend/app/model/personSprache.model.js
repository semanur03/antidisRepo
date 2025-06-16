const PersonSprache = require('../db/webDaten.js');

const PersonSprache = function(ps) {
    this.person_id = ps.person_id;
    this.sprache_id = ps.sprache_id;
};

PersonSprache.create = (newEntry, result) => {
    const query = `
    INSERT INTO person_sprache (person_id, sprache_id) 
    VALUES (?, ?)
    `;

    const values = [
        newEntry.person_id, 
        newEntry.sprache_id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Fehler beim Erstellen des neuen Eintrags: ", err);
            result(err, null);
            return;
        }
        
        // Neue ID zurückgeben
        result(null, { id: this.lastID, ...newEntry});
    });
};

module.exports = PersonSprache;