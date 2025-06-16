const sql = require("../db/webDaten.js")

// constructor
const Person = function(person) {
    this.id = person.id;
    this.titel = person.titel;
    this.vorname = person.vorname;
    this.nachname = person.nachname;
    this.telefon = person.telefon;
    this.email = person.email;
    this.sprachen = person.sprachen;
    this.mitgliedsgruppen = person.mitgliedsgruppen;
    this.gremien = person.gremien;
    this.organisationseinheit = person.organisationseinheit;
};

Person.create = (newPerson, result) => {
    const query = `
    INSERT INTO person (titel, vorname, nachname, telefon, email)
    VALUES (?, ?, ?, ?, ?)
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
            console.log("Fehler beim Erstellen der Person: ", err);
            result(err, null);
            return;
        }
        
        // Neue ID zurückgeben
        result(null, { id: this.lastID, ...newPerson});
    });
};

Person.getAll = (result) => {
    const query = `
    SELECT * FROM person
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Fehler beim Aufrufen der Personen: ", err)
            result(err, null);
            return;
        }

        console.log("Personen: ", res);
        result(null, res);
    });
};

Person.getAllJoin = (result) => {
    const query = `
    SELECT * FROM contacts
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.log("Fehler beim Aufrufen der View Contacts: ", err)
            result(err, null);
            return;
        }

        console.log("Contacts: ", res);
        result(null, res);
    });
};

Person.findById = (personId, result) => {
    const query = `
    SELECT * FROM person WHERE id = ?
    `;

    sql.get(query, [personId], (err, res) => {
        if (err) {
            console.log("Fehler beim Aufrufen der Person mit der Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("gefndene Person: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Person.updateById = (id, person, result) => {
    const query = `
    UPDATE person SET titel = ?, vorname = ?, nachname = ?, telefon = ?, email = ? WHERE id = ?
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
            console.log("Fehler beim Update der Person: ", err);
            result(err, null);
            return;
        }

        if (this.changes == 0) {
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
    DELETE FROM person WHERE id = ?
    `; 

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Fehler beim löschen der Person: ", err);
            result(err, null);
            return;
        }

        if (this.changes == 0) {
            // not found Person with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted person with id: ", id);
        result(null, { message: "deleted person"});
    });
};

module.exports = Person;