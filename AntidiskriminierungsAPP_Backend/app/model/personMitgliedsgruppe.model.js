const sql = require('../db/webDaten.js');

const PersonMitgliedsgruppe = function(pm) {
    this.person_id = pm.person_id;
    this.mitgliedsgruppe_id = pm.mitgliedsgruppe_id;
};

PersonMitgliedsgruppe.create = (newEntry, result) => {
    const query = `
    INSERT INTO 
        person_mitgliedsgruppe (person_id, mitgliedsgruppe_id) 
    VALUES 
        (?, ?)
    `;

    const values = [
        newEntry.person_id, 
        newEntry.mitgliedsgruppe_id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating a new Entry in person_mitgliedsgruppe: ", err);
            result(err, null);
            return;
        }
        
        console.log(`Created Entry in person_mitgliedsgruppe : person_id=${newEntry.person_id}, mitgliedsgruppe_id=${newEntry.mitgliedsgruppe_id}`);
        result(null, newEntry);
    });
};

PersonMitgliedsgruppe.findByPerson = (personId, result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedsgruppe_id, 
        m.mitgliedsgruppe
    FROM 
        person_mitgliedsgruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedsgruppe m ON pm.mitgliedsgruppe_id = m.id
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

PersonMitgliedsgruppe.findByMitgliedsgruppe = (mitgliedsgruppeId, result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedsgruppe_id, 
        m.mitgliedsgruppe
    FROM 
        person_mitgliedsgruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedsgruppe m ON pm.mitgliedsgruppe_id = m.id
    WHERE 
        pm.mitgliedsgruppe_id = ?
    `

    sql.all(query, [mitgliedsgruppeId], (err, res) => {
        if (err) {
            console.log("Error while retrieveing Entry with mitgliedsgruppe_id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("Found Entries with mitgliedsgruppe_id: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

PersonMitgliedsgruppe.getAll = (result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedsgruppe_id, 
        m.mitgliedsgruppe
    FROM 
        person_mitgliedsgruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedsgruppe m ON pm.mitgliedsgruppe_id = m.id
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieveing person_mitgliedsgruppe: ", err)
            result(err, null);
            return;
        }

        console.log("person_mitgliedsgruppe: ", res);
        result(null, res);
    });
};

PersonMitgliedsgruppe.findCombination = (personId, mitgliedsgruppeId, result) => {
    const query = `
    SELECT 
        pm.person_id,
        p.vorname, p.nachname,
        pm.mitgliedsgruppe_id, 
        m.mitgliedsgruppe
    FROM 
        person_mitgliedsgruppe pm
    JOIN
        person p ON pm.person_id = p.id
    JOIN
        mitgliedsgruppe m ON pm.mitgliedsgruppe_id = m.id
    WHERE 
        person_id = ? AND mitgliedsgruppe_id = ?
    `

    sql.all(query, [personId, mitgliedsgruppeId], (err, res) => {
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

PersonMitgliedsgruppe.update = (person_id, mitgliedsgruppe_id, pm, result) => {
    const query = `
    UPDATE 
        person_mitgliedsgruppe
    SET 
        person_id = ?, 
        mitgliedsgruppe_id = ?
    WHERE 
        person_id = ? AND mitgliedsgruppe_id = ?
    `;

    const values = [
        pm.person_id,
        pm.mitgliedsgruppe_id,
        person_id,
        mitgliedsgruppe_id
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

        console.log("Updated Entry: ", { person_id: pm.person_id, mitgliedsgruppe_id: pm.mitgliedsgruppe_id });
        result(null, {  person_id: pm.person_id, mitgliedsgruppe_id: pm.mitgliedsgruppe_id });
    });
};

PersonMitgliedsgruppe.remove = (personId, mitgliedsgruppeId, result) => {
    const query = `
    DELETE FROM 
        person_mitgliedsgruppe
    WHERE 
        person_id = ? AND mitgliedsgruppe_id = ?
    `; 

    sql.run(query, [personId, mitgliedsgruppeId], function(err) {
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

        console.log(`Deleted Entry: person_id=${personId}, mitgliedsgruppe_id=${mitgliedsgruppeId}`);
        result(null, { message: "Succesfully deleted Entry!"});
    });
};

module.exports = PersonMitgliedsgruppe;