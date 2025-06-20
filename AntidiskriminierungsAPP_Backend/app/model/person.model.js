const sql = require("../db/webDaten.js")

// constructor
const Person = function(person) {
    this.titel = person.titel;
    this.vorname = person.vorname;
    this.nachname = person.nachname;
    this.telefon = person.telefon;
    this.email = person.email;
};

Person.create = (newPerson, result) => {
    const query = `
    INSERT INTO 
        person (titel, vorname, nachname, telefon, email)
    VALUES 
        (?, ?, ?, ?, ?)
    `;

    const values = [
        newPerson.titel,
        newPerson.vorname,
        newPerson.nachname,
        newPerson.telefon,
        newPerson.email
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while creating Person: ", err);
            return result(err, null);
        }
        
        console.log("Succesfully created Person with Id:", this.lastID);
        return result(null, {
            id: this.lastID,
            titel: newPerson.titel,
            vorname: newPerson.vorname,
            nachname: newPerson.nachname,
            telefon: newPerson.telefon,
            email: newPerson.email
        });
    });
};

Person.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        person
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving all Person: ", err)
            result(err, null);
            return;
        }

        console.log("All Person: ", res);
        result(null, res);
    });
};

Person.getAllJoin = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        contacts
    `;
    //contacts ist eine view in der DB

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Error while retrieving the view contacts: ", err)
            result(err, null);
            return;
        }

        console.log("Contacts: ", res);
        result(null, res);
    });
};

Person.findById = (personId, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        person 
    WHERE 
        id = ?
    `;

    sql.get(query, [personId], (err, res) => {
        if (err) {
            console.log("Error while retrieving Person with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found person: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Person.updateById = (id, person, result) => {
    const query = `
    UPDATE 
        person 
    SET 
        titel = ?, 
        vorname = ?, 
        nachname = ?, 
        telefon = ?, 
        email = ? 
    WHERE 
        id = ?
    `;

    const values = [
        person.titel,
        person.vorname,
        person.nachname,
        person.telefon,
        person.email,
        id
    ];

    sql.run(query, values, function(err) {
        if (err) {
            console.log("Error while updating Person: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Person with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated person: ", { id: id, ...person });
        result(null, { id: id, ...person });
    });
};

Person.remove = (id, result) => {
    const query = `
    DELETE FROM 
        person 
    WHERE 
        id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting Person: ", err);
            result(err, null);
            return;
        }

        if (this.changes === 0) {
            // not found Person with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted person with id: ", id);
        result(null, { message: "succesfully deleted person"});
    });
};

module.exports = Person;