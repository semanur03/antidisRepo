const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', (req, res) => {
	// console.log('req.body', req.body);
    const mitgliedergruppe = req.body.mitgliedergruppe;
    const betroffenheit = req.body.betroffenheit;
    const message = req.body.message;
    const category = req.body.category;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    var checkbox = req.body.checkbox;
    const formulartyp = req.body.formulartyp;
    const apmail = req.body.apmail;
    const titel = req.body.titel;
    const vorname = req.body.vorname;
    const nachname = req.body.nachname;
    var sprache = req.body.sprache;

    const transporter = nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    var mailOptions = {};

    if (checkbox) {
        checkbox = 'ja';
    }

    if (sprache == 'de') {
        sprache = "deutsch";
    } else if (sprache == 'en') {
        sprache = "englisch";
    }

    if (formulartyp == 'Kontaktformular' && nachname !== 'NA') {
        mailOptions = {
            from: process.env.from,
            to: process.env.to,
            subject: `Kontaktaufnahme mit ${apmail} zur Erstberatung`,
            text: `
            Folgende Informationen wurden in das ${formulartyp} eingegeben:
            Mitgliedergruppe: ${mitgliedergruppe}
            Betroffenheit: ${betroffenheit}
            Nachricht: ${message}
            Kategorie: ${category}
            Nachname: ${lastname}
            Vorname: ${firstname}
            E-Mail: ${email}
            Zustimmung zur Datenverarbeitung: ${checkbox}

            Folgende Ansprechperson wurde ${formulartyp} ausgewählt:
            Titel: ${titel}
            Vorname: ${vorname}
            Nachname: ${nachname}

            Die App wurde auf ${sprache} genutzt.
        `
        };
    } else if (formulartyp == 'Kontaktformular' && nachname == 'NA') {
        mailOptions = {
            from: process.env.from,
            to: process.env.to,
            subject: `Kontaktaufnahme zur Erstberatung`,
            text: `
            Folgende Informationen wurden in das ${formulartyp} eingegeben:
            Mitgliedergruppe: ${mitgliedergruppe}
            Betroffenheit: ${betroffenheit}
            Nachricht: ${message}
            Kategorie: ${category}
            Nachname: ${lastname}
            Vorname: ${firstname}
            E-Mail: ${email}
            Zustimmung zur Datenverarbeitung: ${checkbox}

            Im ${formulartyp} wurde keine Anspechperson ausgewählt.

            Die App wurde auf ${sprache} genutzt.
        `
        };
    } else if (formulartyp == 'Meldeformular') {
        mailOptions = {
            from: process.env.from,
            to: process.env.to,
            subject: `Meldung eines Vorfalls`,
            text: `
            Folgende Informationen wurden in das ${formulartyp} eingegeben:
            Mitgliedergruppe: ${mitgliedergruppe}
            Nachricht: ${message}
            Kategorie: ${category}
            Nachname: ${lastname}
            Vorname: ${firstname}
            E-Mail: ${email}
            Zustimmung zur Datenverarbeitung: ${checkbox}
            
            Die App wurde auf ${sprache} genutzt.
        `
        };
	    // console.log('meldeformular', mailOptions);
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
		console.log('error', error);
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    });
});

module.exports = router;