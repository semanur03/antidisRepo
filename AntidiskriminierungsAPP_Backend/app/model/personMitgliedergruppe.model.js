const sql = require('../db/webDaten.js');

const PersonMitgliedergruppe = function(pm) {
    this.person_id = pm.person_id;
    this.mitgliedergruppe_id = pm.mitgliedergruppe_id;
};

PersonMitgliedergruppe.create = (newEntry, result) => {
    const query = `
    INSERT INTO 
        person_mitgliedergruppe (person_id, mitgliedergruppe_id) 
    VALUES 
        (?, ?)
    `;

    const values = [
        newEntry.person_id, 
        newEntry.mitgliedergruppe_id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating a new Entry in person_mitgliedergruppe: ", err);
            result(err, null);
            return;
        }
        
        console.log(`Created Entry in person_mitgliedergruppe : person_id=${newEntry.person_id}, mitgliedergruppe_id=${newEntry.mitgliedergruppe_id}`);
        result(null, newEntry);
    });
};

PersonMitgliedergruppe.findByPerson = (personId, result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedergruppe_id, 
        m.mitgliedergruppe
    FROM 
        person_mitgliedergruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedergruppe m ON pm.mitgliedergruppe_id = m.id
    WHERE 
        pm.person_id = ?
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

PersonMitgliedergruppe.findByMitgliedergruppe = (mitgliedergruppeId, result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedergruppe_id, 
        m.mitgliedergruppe
    FROM 
        person_mitgliedergruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedergruppe m ON pm.mitgliedergruppe_id = m.id
    WHERE 
        pm.mitgliedergruppe_id = ?
    `

    sql.all(query, [mitgliedergruppeId], (err, res) => {
        if (err) {
            console.log("Error while retrieveing Entry with mitgliedergruppe_id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("Found Entries with mitgliedergruppe_id: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

PersonMitgliedergruppe.getAll = (result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedergruppe_id, 
        m.mitgliedergruppe
    FROM 
        person_mitgliedergruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedergruppe m ON pm.mitgliedergruppe_id = m.id
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieveing person_mitgliedergruppe: ", err)
            result(err, null);
            return;
        }

        console.log("person_mitgliedergruppe: ", res);
        result(null, res);
    });
};

PersonMitgliedergruppe.findCombination = (personId, mitgliedergruppeId, result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedergruppe_id, 
        m.mitgliedergruppe
    FROM 
        person_mitgliedergruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedergruppe m ON pm.mitgliedergruppe_id = m.id
    WHERE 
        person_id = ? AND mitgliedergruppe_id = ?
    `

    sql.all(query, [personId, mitgliedergruppeId], (err, res) => {
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

PersonMitgliedergruppe.update = (person_id, mitgliedergruppe_id, pm, result) => {
    const query = `
    UPDATE 
        person_mitgliedergruppe
    SET 
        person_id = ?, 
        mitgliedergruppe_id = ?
    WHERE 
        person_id = ? AND mitgliedergruppe_id = ?
    `;

    const values = [
        pm.person_id,
        pm.mitgliedergruppe_id,
        person_id,
        mitgliedergruppe_id
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

        console.log("Updated Entry: ", { person_id: pm.person_id, mitgliedergruppe_id: pm.mitgliedergruppe_id });
        result(null, {  person_id: pm.person_id, mitgliedergruppe_id: pm.mitgliedergruppe_id });
    });
};

PersonMitgliedergruppe.remove = (personId, mitgliedergruppeId, result) => {
    const query = `
    DELETE FROM 
        person_mitgliedergruppe
    WHERE 
        person_id = ? AND mitgliedergruppe_id = ?
    `; 

    sql.run(query, [personId, mitgliedergruppeId], function(err) {
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

        console.log(`Deleted Entry: person_id=${personId}, mitgliedergruppe_id=${mitgliedergruppeId}`);
        result(null, { message: "Succesfully deleted Entry!"});
    });
};

module.exports = PersonMitgliedergruppe;