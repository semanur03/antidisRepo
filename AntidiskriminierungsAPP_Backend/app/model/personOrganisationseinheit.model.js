const sql = require('../db/webDaten.js');

const PersonOrganisationseinheit = function(po) {
    this.person_id = po.person_id;
    this.organisationseinheit_id = po.organisationseinheit_id;
};

PersonOrganisationseinheit.create = (newEntry, result) => {
    const query = `
    INSERT INTO 
        person_organisationseinheit (person_id, organisationseinheit_id) 
    VALUES 
        (?, ?)
    `;

    const values = [
        newEntry.person_id, 
        newEntry.organisationseinheit_id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating a new Entry in person_organisationseinheit: ", err);
            result(err, null);
            return;
        }
        
        console.log(`Created Entry in person_organisationseinheit : person_id=${newEntry.person_id}, organisationseinheit_id=${newEntry.organisationseinheit_id}`);
        result(null, newEntry);
    });
};

PersonOrganisationseinheit.findByPerson = (personId, result) => {
    const query = `
    SELECT 
        po.person_id, 
        p.vorname, p.nachname,
        po.organisationseinheit_id, 
        o.organisationseinheit 
    FROM 
        person_organisationseinheit po
    JOIN
        person p ON po.person_id = p.id
    JOIN
        organisationseinheit o ON po.organisationseinheit_id = o.id
    WHERE 
        po.person_id = ?
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

PersonOrganisationseinheit.findByOrganisationseinheit = (organisationseinheitId, result) => {
    const query = `
    SELECT 
        po.person_id, 
        p.vorname, p.nachname,
        po.organisationseinheit_id, 
        o.organisationseinheit 
    FROM 
        person_organisationseinheit po
    JOIN
        person p ON po.person_id = p.id
    JOIN
        organisationseinheit o ON po.organisationseinheit_id = o.id
    WHERE 
        po.organisationseinheit_id = ?
    `

    sql.all(query, [organisationseinheitId], (err, res) => {
        if (err) {
            console.log("Error while retrieveing Entry with organisationseinheit_id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("Found Entries with organisationseinheit_id: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

PersonOrganisationseinheit.getAll = (result) => {
    const query = `
    SELECT 
        po.person_id, 
        p.vorname, p.nachname,
        po.organisationseinheit_id, 
        o.organisationseinheit 
    FROM 
        person_organisationseinheit po
    JOIN
        person p ON po.person_id = p.id
    JOIN
        organisationseinheit o ON po.organisationseinheit_id = o.id
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieveing person_organisationseinheit: ", err)
            result(err, null);
            return;
        }

        console.log("person_organisationseinheit: ", res);
        result(null, res);
    });
};

PersonOrganisationseinheit.findCombination = (personId, organisationseinheitId, result) => {
    const query = `
    SELECT 
        po.person_id, 
        p.vorname, p.nachname,
        po.organisationseinheit_id, 
        o.organisationseinheit 
    FROM 
        person_organisationseinheit po
    JOIN
        person p ON po.person_id = p.id
    JOIN
        organisationseinheit o ON po.organisationseinheit_id = o.id
    WHERE 
        person_id = ? AND organisationseinheit_id = ?
    `

    sql.all(query, [personId, organisationseinheitId], (err, res) => {
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

PersonOrganisationseinheit.update = (person_id, organisationseinheit_id, po, result) => {
    const query = `
    UPDATE 
        person_organisationseinheit
    SET 
        person_id = ?, 
        organisationseinheit_id = ?
    WHERE 
        person_id = ? AND organisationseinheit_id = ?
    `;

    const values = [
        po.person_id,
        po.organisationseinheit_id,
        person_id,
        organisationseinheit_id
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

        console.log("Updated Entry: ", { person_id: po.person_id, organisationseinheit_id: po.organisationseinheit_id });
        result(null, {  person_id: po.person_id, organisationseinheit_id: po.organisationseinheit_id });
    });
};

PersonOrganisationseinheit.remove = (personId, organisationseinheitId, result) => {
    const query = `
    DELETE FROM 
        person_organisationseinheit
    WHERE 
        person_id = ? AND organisationseinheit_id = ?
    `; 

    sql.run(query, [personId, organisationseinheitId], function(err) {
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

        console.log(`Deleted Entry: person_id=${personId}, organisationseinheit_id=${organisationseinheitId}`);
        result(null, { message: "Succesfully deleted Entry!"});
    });
};

module.exports = PersonOrganisationseinheit;