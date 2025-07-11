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

Mehrsprachigkeit.getAllGrouped = (result) => {
    const query = `
        SELECT id, deutsch, englisch 
        FROM mehrsprachigkeit
    `;

    sql.all(query, [], (err, rows) => {
        if (err) {
        console.error("Error while retrieving:", err);
        return result(err, null);
        }

        const groups = {
        "Start / Home Page": [],
        "Success Page": [],
        "Error Page": [],
        "Footer": [],
        "Imprint": [],
        "Privacy": [],
        "Get In Contact": [],
        "Kontaktliste / Contact List": [],
        "Kontaktformular": [],
        "Filter/Select": [],
        "Meldeformular": [],
        "FAQ": [],
        "Mitgliedergruppe / Membergroup": [],
        "Organisationseinheit / Organisational Unit": [],
        "Gremium / Committee": [],
        "Login": [],
        "Admin-Bereich / Admin-Section": [],
        "Kontakt Verwaltung / Contact Management": [],
        "Text Verwaltung / Text Management": [],
        };

        rows.forEach(row => {
        const key = row.id;

        if (key.startsWith('home.page.')) {
            groups["Start / Home Page"].push(row);
        } else if (key.startsWith('success.page.')) {
            groups["Success Page"].push(row);
        } else if (key.startsWith('error.page.')) {
            groups["Error Page"].push(row);
        } else if (key.startsWith('footer.')) {
            groups["Footer"].push(row);
        } else if (key.startsWith('imprint.')) {
            groups["Imprint"].push(row);
        } else if (key.startsWith('privacy.')) {
            groups["Privacy"].push(row);
        } else if (key.startsWith('getincontact.')) {
            groups["Get In Contact"].push(row);
        } else if (key.startsWith('kontaktformular.')) {
            groups["Kontaktformular"].push(row);
        } else if (key.startsWith('contactlist.')) {
            groups["Kontaktliste / Contact List"].push(row);
        } else if (key.startsWith('filter.') || key.startsWith('select') || key.startsWith('find') || ['DEPUTY_MEMBER_ANTIDIS_COUNCIL', 'language', 'contact.filter.message'].includes(key)) {
            groups["Filter/Select"].push(row);
        } else if (key.startsWith('meldeformular.')) {
            groups["Meldeformular"].push(row);
        } else if (key.startsWith('faq.')) {
            groups["FAQ"].push(row);
        } else if (key.startsWith('login')) {
            groups["Login"].push(row);
        } else if (['EMPLOYEE_TECH', 'STUDENT', 'PROFESSOR', 'RESEARCH_ASSISTANT', 'LECTURER'].includes(key)) {
            groups["Mitgliedergruppe / Membergroup"].push(row);
        } else if (['FB 1', 'FB 2', 'FB 3', 'FB 4', 'FB 5', 'STUDENT_ADVISE', 'GENERAL_STUDENT_SERVICE', 'COMMUNICATION_DEPARTMENT', 'FACILITY_FOREIGN_LANG', 'INTERNATIONAL_OFFICE', 'UNIVERSITY_LIBRARY', 'UNIVERSITY_MANAGEMENT', 'UNIVERSITY_COMP_CENTER', 'HR', 'PROMOTION_WOMEN'].includes(key)) {
            groups["Organisationseinheit / Organisational Unit"].push(row);
        } else if (['WOMEN_AND_EQOP_OFFICER', 'MEMBER_TRUST_TEAM', 'DEPUTY_DISABLED_EMPLOYEES', 'ASTA', 'COUNCIL', 'OMBUDSPERSON', 'REP_DISABLED_STUDENTS', 'STAFF_COUNCIL', 'PERSON_OF_TRUST_DISABLED_EMP', 'S_COUNCIL', 'DEPUTY_1', 'DEPUTY_2', 'FT_WOMEN_AND_EQOP_REP'].includes(key)) {
            groups["Gremium / Committee"].push(row);
        } else if (key.startsWith('admin-')) {
            groups["Admin-Bereich / Admin-Section"].push(row);
        } else if (key.startsWith('contact-')) {
            groups["Kontakt Verwaltung / Contact Management"].push(row);
        } else if (key.startsWith('text-management')) {
            groups["Text Verwaltung / Text Management"].push(row);
        } else {
            // Fallback:Falls was vergessen wurde
            if (!groups["Sonstige"]) groups["Sonstige"] = [];
            groups["Sonstige"].push(row);
        }
        });

        // Umwandeln in Array für Frontend
        const resultArray = Object.entries(groups).map(([category, translations]) => ({
        category,
        translations
        }));

        result(null, resultArray);
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