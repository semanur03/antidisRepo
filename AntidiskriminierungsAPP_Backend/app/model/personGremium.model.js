const sql = require('../db/webDaten.js');

const PersonGremium = function(pg) {
    this.person_id = pg.person_id;
    this.gremium_id = pg.gremium_id;
};

PersonGremium.create = (newEntry, result) => {
    const query = `
    INSERT INTO 
        person_gremium (person_id, gremium_id) 
    VALUES 
        (?, ?)
    `;

    const values = [
        newEntry.person_id, 
        newEntry.gremium_id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating a new Entry in person_gremium: ", err);
            result(err, null);
            return;
        }
        
        console.log(`Created Entry in person_gremium : person_id=${newEntry.person_id}, gremium_id=${newEntry.gremium_id}`);
        result(null, newEntry);
    });
};

PersonGremium.findByPerson = (personId, result) => {
    const query = `
    SELECT 
        pg.person_id, 
        p.vorname, p.nachname, 
        pg.gremium_id, 
        g.gremium 
    FROM 
        person_gremium pg
    JOIN
        person p ON pg.person_id = p.id
    JOIN
        gremium g ON pg.gremium_id = g.id
    WHERE 
        pg.person_id = ?
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

PersonGremium.findByGremium = (gremiumId, result) => {
    const query = `
    SELECT 
        pg.person_id, 
        p.vorname, p.nachname, 
        pg.gremium_id, 
        g.gremium 
    FROM 
        person_gremium pg
    JOIN
        person p ON pg.person_id = p.id
    JOIN
        gremium g ON pg.gremium_id = g.id
    WHERE 
        pg.gremium_id = ?
    `

    sql.all(query, [gremiumId], (err, res) => {
        if (err) {
            console.log("Error while retrieveing Entry with gremium_id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("Found Entries with gremium_id: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

PersonGremium.getAll = (result) => {
    const query = `
    SELECT 
        pg.person_id, 
        p.vorname, p.nachname, 
        pg.gremium_id, 
        g.gremium 
    FROM 
        person_gremium pg
    JOIN
        person p ON pg.person_id = p.id
    JOIN
        gremium g ON pg.gremium_id = g.id
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieveing person_gremium: ", err)
            result(err, null);
            return;
        }

        console.log("person_gremium: ", res);
        result(null, res);
    });
};

PersonGremium.findCombination = (personId, gremiumId, result) => {
    const query = `
    SELECT 
        pg.person_id, 
        p.vorname, p.nachname, 
        pg.gremium_id, 
        g.gremium  
    FROM 
        person_gremium pg
    JOIN
        person p ON pg.person_id = p.id
    JOIN
        gremium g ON pg.gremium_id = g.id
    WHERE 
        person_id = ? AND gremium_id = ?
    `

    sql.all(query, [personId, gremiumId], (err, res) => {
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

PersonGremium.update = (person_id, gremium_id, pg, result) => {
    const query = `
    UPDATE 
        person_gremium
    SET 
        person_id = ?, 
        gremium_id = ?
    WHERE 
        person_id = ? AND gremium_id = ?
    `;

    const values = [
        pg.person_id,
        pg.gremium_id,
        person_id,
        gremium_id
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

        console.log("Updated Entry: ", { person_id: pg.person_id, gremium_id: pg.gremium_id });
        result(null, {  person_id: pg.person_id, gremium_id: pg.gremium_id });
    });
};

PersonGremium.remove = (personId, gremiumId, result) => {
    const query = `
    DELETE FROM 
        person_gremium
    WHERE 
        person_id = ? AND gremium_id = ?
    `; 

    sql.run(query, [personId, gremiumId], function(err) {
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

        console.log(`Deleted Entry: person_id=${personId}, gremium_id=${gremiumId}`);
        result(null, { message: "Succesfully deleted Entry!"});
    });
};

module.exports = PersonGremium;