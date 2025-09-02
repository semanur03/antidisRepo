module.exports = app => {
    const person = require("../controller/person.controller.js")
    const personSprache = require("../controller/personSprache.controller.js");
    const sprache = require("../controller/sprache.controller.js");
    const personGremium = require("../controller/personGremium.controller.js");
    const gremium = require("../controller/gremium.controller.js");
    const personMitgliedergruppe = require("../controller/personMitgliedergruppe.controller.js");
    const mitgliedergruppe = require("../controller/mitgliedergruppe.controller.js");
    const personOrganisationseinheit = require("../controller/personOrganisationseinheit.controller.js");
    const organisationseinheit = require("../controller/organisationseinheit.controller.js");
    const mehrsprachigkeit = require("../controller/mehrsprachigkeit.controller.js");
    const user = require("../controller/admin.controller.js");

//Create a new Person
app.post("/api/person", person.create);

//Get all Persons
app.get("/api/person", person.findAll);

//Get all informations joined
app.get("/api/person/joined", person.getAllJoin);

//Get one single Person with person_id
app.get("/api/person/:person_id", person.findOne);

//Update a single Person with person_id
app.put("/api/person/:person_id", person.update);

//Delete a single Person with person_id
app.delete("/api/person/:person_id", person.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_sprache
app.post("/api/person-sprache", personSprache.create);

//Get all Entries based on person_id
app.get("/api/person-sprache/person/:person_id", personSprache.findByPerson);

//Get an Entries based on sprache_id
app.get("/api/person-sprache/sprache/:sprache_id", personSprache.findBySprache);

//Get all Entries
app.get("/api/person-sprache", personSprache.findAll);

//Get an Entry based on id
app.get("/api/person-sprache/person/:person_id/sprache/:sprache_id", personSprache.findCombination);

//Update an Entry in person_sprache based on person_id
app.put("/api/person-sprache/person/:person_id/sprache/:sprache_id", personSprache.update)

//Delete an Entry in person_sprache with person_id
app.delete("/api/person-sprache/person/:person_id/sprache/:sprache_id", personSprache.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Sprache
app.post("/api/sprache", sprache.create);

//Get all Sprache
app.get("/api/sprache", sprache.findAll);

//Get one single Sprache with sprache_id
app.get("/api/sprache/:sprache_id", sprache.findOne);

//Update a single Sprache with sprache_id
app.put("/api/sprache/:sprache_id", sprache.update);

//Delete a single Sprache with sprache_id
app.delete("/api/sprache/:sprache_id", sprache.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_gremium
app.post("/api/person-gremium", personGremium.create);

//Get all Entries based on person_id
app.get("/api/person-gremium/person/:person_id", personGremium.findByPerson);

//Get an Entries based on gremium_id
app.get("/api/person-gremium/gremium/:gremium_id", personGremium.findByGremium);

//Get all Entries
app.get("/api/person-gremium", personGremium.findAll);

//Get an Entry based on id
app.get("/api/person-gremium/person/:person_id/gremium/:gremium_id", personGremium.findCombination);

//Update an Entry in person_gremium based on person_id
app.put("/api/person-gremium/person/:person_id/gremium/:gremium_id", personGremium.update)

//Delete an Entry in person_gremium with person_id
app.delete("/api/person-gremium/person/:person_id/gremium/:gremium_id", personGremium.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Gremium
app.post("/api/gremium", gremium.create);

//Get all Gremium
app.get("/api/gremium", gremium.findAll);

//Get one single Gremium with gremium_id
app.get("/api/gremium/:gremium_id", gremium.findOne);

//Update a single Gremium with gremium_id
app.put("/api/gremium/:gremium_id", gremium.update);

//Delete a single Gremium with gremium_id
app.delete("/api/gremium/:gremium_id", gremium.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_mitgliedergruppe
app.post("/api/person-mitgliedergruppe", personMitgliedergruppe.create);

//Get all Entries based on person_id
app.get("/api/person-mitgliedergruppe/person/:person_id", personMitgliedergruppe.findByPerson);

//Get an Entries based on mitgliedergruppe_id
app.get("/api/person-mitgliedergruppe/mitgliedergruppe/:mitgliedergruppe_id", personMitgliedergruppe.findByMitgliedergruppe);

//Get all Entries
app.get("/api/person-mitgliedergruppe", personMitgliedergruppe.findAll);

//Get an Entry based on id
app.get("/api/person-mitgliedergruppe/person/:person_id/mitgliedergruppe/:mitgliedergruppe_id", personMitgliedergruppe.findCombination);

//Update an Entry in person_mitgliedergruppe based on person_id
app.put("/api/person-mitgliedergruppe/person/:person_id/mitgliedergruppe/:mitgliedergruppe_id", personMitgliedergruppe.update)

//Delete an Entry in person_mitgliedergruppe with person_id
app.delete("/api/person-mitgliedergruppe/person/:person_id/mitgliedergruppe/:mitgliedergruppe_id", personMitgliedergruppe.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Mitgliedergruppe
app.post("/api/mitgliedergruppe", mitgliedergruppe.create);

//Get all Mitgliedergruppe
app.get("/api/mitgliedergruppe", mitgliedergruppe.findAll);

//Get one single Mitgliedergruppe with mitgliedergruppe_id
app.get("/api/mitgliedergruppe/:mitgliedergruppe_id", mitgliedergruppe.findOne);

//Update a single Mitgliedergruppe with mitgliedergruppe_id
app.put("/api/mitgliedergruppe/:mitgliedergruppe_id", mitgliedergruppe.update);

//Delete a single Mitgliedergruppe with mitgliedergruppe_id
app.delete("/api/mitgliedergruppe/:mitgliedergruppe_id", mitgliedergruppe.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_organisationseinheit
app.post("/api/person-organisationseinheit", personOrganisationseinheit.create);

//Get all Entries based on person_id
app.get("/api/person-organisationseinheit/person/:person_id", personOrganisationseinheit.findByPerson);

//Get an Entries based on organisationseinheit_id
app.get("/api/person-organisationseinheit/organisationseinheit/:organisationseinheit_id", personOrganisationseinheit.findByOrganisationseinheit);

//Get all Entries
app.get("/api/person-organisationseinheit", personOrganisationseinheit.findAll);

//Get an Entry based on id
app.get("/api/person-organisationseinheit/person/:person_id/organisationseinheit/:organisationseinheit_id", personOrganisationseinheit.findCombination);

//Update an Entry in person_organisationseinheit based on person_id
app.put("/api/person-organisationseinheit/person/:person_id/organisationseinheit/:organisationseinheit_id", personOrganisationseinheit.update)

//Delete an Entry in personorganisationseinheit with person_id
app.delete("/api/person-organisationseinheit/person/:person_id/organisationseinheit/:organisationseinheit_id", personOrganisationseinheit.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Organisationseinheit
app.post("/api/organisationseinheit", organisationseinheit.create);

//Get all Organisationseinheit
app.get("/api/organisationseinheit", organisationseinheit.findAll);

//Get one single Organisationseinheit with organisationseinheit_id
app.get("/api/organisationseinheit/:organisationseinheit_id", organisationseinheit.findOne);

//Update a single Organisationseinheit with organisationseinheit_id
app.put("/api/organisationseinheit/:organisationseinheit_id", organisationseinheit.update);

//Delete a single Organisationseinheit with organisationseinheit_id
app.delete("/api/organisationseinheit/:organisationseinheit_id", organisationseinheit.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Mehrsprachigkeit
app.post("/api/mehrsprachigkeit", mehrsprachigkeit.create);

//Get all Mehrsprachigkeit
app.get("/api/mehrsprachigkeit", mehrsprachigkeit.findAll);

//Get all Mehrsprachigkeit Grouped
app.get("/api/mehrsprachigkeit/grouped", mehrsprachigkeit.findAllGrouped);

//Get one single Mehrsprachigkeit with mehrsprachigkeit_id
app.get("/api/mehrsprachigkeit/:mehrsprachigkeit_id", mehrsprachigkeit.findOne);

//Update a single Mehrsprachigkeit with mehrsprachigkeit_id
app.put("/api/mehrsprachigkeit/:mehrsprachigkeit_id", mehrsprachigkeit.update);

//Delete a single Mehrsprachigkeit with mehrsprachigkeit_id
app.delete("/api/mehrsprachigkeit/:mehrsprachigkeit_id", mehrsprachigkeit.delete);

//Get an Entry based on the choosen language
app.get("/api/mehrsprachigkeit/sprache/:lang", mehrsprachigkeit.findByLanguage);

//Get an Entry based on the id and choosen language
app.get("/api/mehrsprachigkeit/:id/sprache/:lang", mehrsprachigkeit.findByIdAndLanguage);

//////////////////////////////////////////////////////////////////////////////////////////

//Get all Admin Users
app.get("/api/adm", user.findAll);

//Register a new Admin User
app.post("/api/adm/register", user.register);

//Login a Admin User
app.post("/api/adm/login", user.login);

//Update a single Admin User
app.put("/api/adm/:id", user.update);

//Find an Admin User by their username
app.get("/api/adm/username/:name", user.findByUsername);

//Find an Admin User by their email
app.get("/api/adm/email/:email", user.findByEmail);

//Find an Admin User by id
app.get("/api/adm/:id", user.findOne);

//Delete a single Admin User with their id
app.delete("/api/adm/:id", user.delete);

//////////////////////////////////////////////////////////////////////////////////////////

};
