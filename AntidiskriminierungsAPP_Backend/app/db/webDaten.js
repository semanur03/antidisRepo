const sqlite3 = require('sqlite3');
const path = require('path');

// Absoluter Pfad zur SQLite-Datei
const dbPath = path.join(__dirname, 'testWebDaten.db');

// Neue SQLite-Verbindung erzeugen
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Fehler beim Verbinden mit der Datenbank:', err.message);
    } else {
        console.log('Verbindung zur SQLite-Datenbank erfolgreich (testWebDaten.js)');
    }
});

module.exports = db;