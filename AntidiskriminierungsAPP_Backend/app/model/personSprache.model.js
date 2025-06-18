const sql = require('../db/webDaten.js');

const PersonSprache = function(ps) {
    this.person_id = ps.person_id;
    this.sprache_id = ps.sprache_id;
};

PersonSprache.create = (newEntry, result) => {
    const query = `
    INSERT INTO 
        person_sprache (person_id, sprache_id) 
    VALUES 
        (?, ?)
    `;

    const values = [
        newEntry.person_id, 
        newEntry.sprache_id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating a new Entry in person_sprache: ", err);
            result(err, null);
            return;
        }
        
        console.log(`Created Entry in person_sprache : person_id=${newEntry.person_id}, sprache_id=${newEntry.sprache_id}`);
        result(null, newEntry);
    });
};

PersonSprache.findByPerson = (personId, result) => {
    const query = `
    SELECT 
        ps.person_id, ps.sprache_id, 
        s.sprache, 
        p.vorname, p.nachname 
    FROM 
        person_sprache ps
    JOIN
        person p ON ps.person_id = p.id
    JOIN
        sprache s ON ps.sprache_id = s.id
    WHERE 
        ps.person_id = ?
    `

    sql.all(query, [personId], (err, res) => {
        if (err) {
            console.log("Error while retrieveing Entry with person_id : ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("Found Entries with person_id: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

PersonSprache.findBySprache = (spracheId, result) => {
    const query = `
    SELECT 
        ps.person_id, ps.sprache_id, 
        s.sprache, 
        p.vorname, p.nachname 
    FROM 
        person_sprache ps
    JOIN
        person p ON ps.person_id = p.id
    JOIN
        sprache s ON ps.sprache_id = s.id
    WHERE 
        ps.sprache_id = ?
    `

    sql.all(query, [spracheId], (err, res) => {
        if (err) {
            console.log("Error while retrieveing Entry with sprache_id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("Found Entries with sprache_id: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

PersonSprache.getAll = (result) => {
    const query = `
    SELECT 
        ps.person_id, ps.sprache_id, 
        s.sprache, 
        p.vorname, p.nachname 
    FROM 
        person_sprache ps
    JOIN
        person p ON ps.person_id = p.id
    JOIN
        sprache s ON ps.sprache_id = s.id
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieveing person_sprache: ", err)
            result(err, null);
            return;
        }

        console.log("person_sprache: ", res);
        result(null, res);
    });
};

PersonSprache.findCombination = (personId, spracheId, result) => {
    const query = `
    SELECT 
        ps.person_id, ps.sprache_id, 
        s.sprache, 
        p.vorname, p.nachname 
    FROM 
        person_sprache ps
    JOIN
        person p ON ps.person_id = p.id
    JOIN
        sprache s ON ps.sprache_id = s.id
    WHERE 
        person_id = ? AND sprache_id = ?
    `

    sql.all(query, [personId, spracheId], (err, res) => {
        if (err) {
            console.log("Error while retrivieng Entry with combination: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("Found Entry with combination ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

PersonSprache.update = (person_id, sprache_id, ps, result) => {
    const query = `
    UPDATE 
        person_sprache
    SET 
        person_id = ?, 
        sprache_id = ?
    WHERE 
        person_id = ? AND sprache_id = ?
    `;

    const values = [
        ps.person_id,
        ps.sprache_id,
        person_id,
        sprache_id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating the Entry: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Entry with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Updated Entry: ", { person_id: ps.person_id, sprache_id: ps.sprache_id });
        result(null, {  person_id: ps.person_id, sprache_id: ps.sprache_id });
    });
};

PersonSprache.remove = (personId, spracheId, result) => {
    const query = `
    DELETE FROM 
        person_sprache
    WHERE 
        person_id = ? AND sprache_id = ?
    `; 

    sql.run(query, [personId, spracheId], function(err) {
        if (err) {
            console.log("Error while deleting the Entry: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Person with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`Deleted Entry: person_id=${personId}, sprache_id=${spracheId}`);
        result(null, { message: "Succesfully deleted Entry!"});
    });
};

module.exports = PersonSprache;