const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.serverport;
const https = require('https');
const fs = require('fs');
const privkeyLink = fs.readlinkSync("/etc/letsencrypt/live/antidis.f4.htw-berlin.de/privkey.pem");
console.log(privkeyLink);
const fullchainLink = fs.readlinkSync("/etc/letsencrypt/live/antidis.f4.htw-berlin.de/fullchain.pem");
console.log(fullchainLink);
const https_options = {
	key: fs.readFileSync("/etc/letsencrypt/live/antidis.f4.htw-berlin.de/" + privkeyLink), 
	cert: fs.readFileSync("/etc/letsencrypt/live/antidis.f4.htw-berlin.de/" + fullchainLink)
};

app.use(bodyParser.json());
app.use(cors());

// console.log('from', process.env.from)
// console.log('to', process.env.to)

app.get('', (req, res) => {
	res.send({ message: "test"})
})

app.post('', (req, res) => {
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

https.createServer(https_options, app).listen(PORT, (error) => {
    if (error) {
	    console.log('server error', error);
    } else {
	    console.log(`https-server listening on port ${PORT} ...`);
    } 
});
