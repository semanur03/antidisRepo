module.exports = app => {
    const person = require("../controller/person.controller.js")
    const personSprache = require("../controller/personSprache.controller.js");
    const sprache = require("../controller/sprache.controller.js");
    const personGremium = require("../controller/personGremium.controller.js");
    const gremium = require("../controller/gremium.controller.js");
    const personMitgliedsgruppe = require("../controller/personMitgliedsgruppe.controller.js");
    const mitgliedsgruppe = require("../controller/mitgliedsgruppe.controller.js");
    const personOrganisationseinheit = require("../controller/personOrganisationseinheit.controller.js");
    const organisationseinheit = require("../controller/organisationseinheit.controller.js");
    const mehrsprachigkeit = require("../controller/mehrsprachigkeit.controller.js");

//Create a new Person
app.post("/person", person.create);

//Get all Persons
app.get("/person", person.findAll);

//Get all informations joined
app.get("/person/joined", person.getAllJoin);

//Get one single Person with person_id
app.get("/person/:person_id", person.findOne);

//Update a single Person with person_id
app.put("/person/:person_id", person.update);

//Delete a single Person with person_id
app.delete("/person/:person_id", person.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_sprache
app.post("/person-sprache", personSprache.create);

//Get all Entries based on person_id
app.get("/person-sprache/person/:person_id", personSprache.findByPerson);

//Get an Entries based on sprache_id
app.get("/person-sprache/sprache/:sprache_id", personSprache.findBySprache);

//Get all Entries
app.get("/person-sprache", personSprache.findAll);

//Get an Entry based on id
app.get("/person-sprache/person/:person_id/sprache/:sprache_id", personSprache.findCombination);

//Update an Entry in person_sprache based on person_id
app.put("/person-sprache/person/:person_id/sprache/:sprache_id", personSprache.update)

//Delete an Entry in person_sprache with person_id
app.delete("/person-sprache/person/:person_id/sprache/:sprache_id", personSprache.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Sprache
app.post("/sprache", sprache.create);

//Get all Sprache
app.get("/sprache", sprache.findAll);

//Get one single Sprache with sprache_id
app.get("/sprache/:sprache_id", sprache.findOne);

//Update a single Sprache with sprache_id
app.put("/sprache/:sprache_id", sprache.update);

//Delete a single Sprache with sprache_id
app.delete("/sprache/:sprache_id", sprache.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_gremium
app.post("/person-gremium", personGremium.create);

//Get all Entries based on person_id
app.get("/person-gremium/person/:person_id", personGremium.findByPerson);

//Get an Entries based on gremium_id
app.get("/person-gremium/gremium/:gremium_id", personGremium.findByGremium);

//Get all Entries
app.get("/person-gremium", personGremium.findAll);

//Get an Entry based on id
app.get("/person-gremium/person/:person_id/gremium/:gremium_id", personGremium.findCombination);

//Update an Entry in person_gremium based on person_id
app.put("/person-gremium/person/:person_id/gremium/:gremium_id", personGremium.update)

//Delete an Entry in person_gremium with person_id
app.delete("/person-gremium/person/:person_id/gremium/:gremium_id", personGremium.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Gremium
app.post("/gremium", gremium.create);

//Get all Gremium
app.get("/gremium", gremium.findAll);

//Get one single Gremium with gremium_id
app.get("/gremium/:gremium_id", gremium.findOne);

//Update a single Gremium with gremium_id
app.put("/gremium/:gremium_id", gremium.update);

//Delete a single Gremium with gremium_id
app.delete("/gremium/:gremium_id", gremium.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_mitgliedsgruppe
app.post("/person-mitgliedsgruppe", personMitgliedsgruppe.create);

//Get all Entries based on person_id
app.get("/person-mitgliedsgruppe/person/:person_id", personMitgliedsgruppe.findByPerson);

//Get an Entries based on mitgliedsgruppe_id
app.get("/person-mitgliedsgruppe/mitgliedsgruppe/:mitgliedsgruppe_id", personMitgliedsgruppe.findByMitgliedsgruppe);

//Get all Entries
app.get("/person-mitgliedsgruppe", personMitgliedsgruppe.findAll);

//Get an Entry based on id
app.get("/person-mitgliedsgruppe/person/:person_id/mitgliedsgruppe/:mitgliedsgruppe_id", personMitgliedsgruppe.findCombination);

//Update an Entry in person_mitgliedsgruppe based on person_id
app.put("/person-mitgliedsgruppe/person/:person_id/mitgliedsgruppe/:mitgliedsgruppe_id", personMitgliedsgruppe.update)

//Delete an Entry in person_mitgliedsgruppe with person_id
app.delete("/person-mitgliedsgruppe/person/:person_id/mitgliedsgruppe/:mitgliedsgruppe_id", personMitgliedsgruppe.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Mitgliedsgruppe
app.post("/mitgliedsgruppe", mitgliedsgruppe.create);

//Get all Mitgliedsgruppe
app.get("/mitgliedsgruppe", mitgliedsgruppe.findAll);

//Get one single Mitgliedsgruppe with mitgliedsgruppe_id
app.get("/mitgliedsgruppe/:mitgliedsgruppe_id", mitgliedsgruppe.findOne);

//Update a single Mitgliedsgruppe with mitgliedsgruppe_id
app.put("/mitgliedsgruppe/:mitgliedsgruppe_id", mitgliedsgruppe.update);

//Delete a single Mitgliedsgruppe with mitgliedsgruppe_id
app.delete("/mitgliedsgruppe/:mitgliedsgruppe_id", mitgliedsgruppe.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Entry in person_organisationseinheit
app.post("/person-organisationseinheit", personOrganisationseinheit.create);

//Get all Entries based on person_id
app.get("/person-organisationseinheit/person/:person_id", personOrganisationseinheit.findByPerson);

//Get an Entries based on organisationseinheit_id
app.get("/person-organisationseinheit/organisationseinheit/:organisationseinheit_id", personOrganisationseinheit.findByOrganisationseinheit);

//Get all Entries
app.get("/person-organisationseinheit", personOrganisationseinheit.findAll);

//Get an Entry based on id
app.get("/person-organisationseinheit/person/:person_id/organisationseinheit/:organisationseinheit_id", personOrganisationseinheit.findCombination);

//Update an Entry in person_organisationseinheit based on person_id
app.put("/person-organisationseinheit/person/:person_id/organisationseinheit/:organisationseinheit_id", personOrganisationseinheit.update)

//Delete an Entry in personorganisationseinheit with person_id
app.delete("/person-organisationseinheit/person/:person_id/organisationseinheit/organisationseinheit_id", personOrganisationseinheit.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Organisationseinheit
app.post("/organisationseinheit", organisationseinheit.create);

//Get all Organisationseinheit
app.get("/organisationseinheit", organisationseinheit.findAll);

//Get one single Organisationseinheit with organisationseinheit_id
app.get("/organisationseinheit/:organisationseinheit_id", organisationseinheit.findOne);

//Update a single Organisationseinheit with organisationseinheit_id
app.put("/organisationseinheit/:organisationseinheit_id", organisationseinheit.update);

//Delete a single Organisationseinheit with organisationseinheit_id
app.delete("/organisationseinheit/:organisationseinheit_id", organisationseinheit.delete);

//////////////////////////////////////////////////////////////////////////////////////////

//Create a new Mehrsprachigkeit
app.post("/mehrsprachigkeit", mehrsprachigkeit.create);

//Get all Mehrsprachigkeit
app.get("/mehrsprachigkeit", mehrsprachigkeit.findAll);

//Get one single Mehrsprachigkeit with mehrsprachigkeit_id
app.get("/mehrsprachigkeit/:mehrsprachigkeit_id", mehrsprachigkeit.findOne);

//Update a single Mehrsprachigkeit with mehrsprachigkeit_id
app.put("/mehrsprachigkeit/:mehrsprachigkeit_id", mehrsprachigkeit.update);

//Delete a single Mehrsprachigkeit with mehrsprachigkeit_id
app.delete("/mehrsprachigkeit/:mehrsprachigkeit_id", mehrsprachigkeit.delete);

//Get an Entry based on the choosen language
app.get("/mehrsprachigkeit/sprache/:lang", mehrsprachigkeit.findByLanguage);

//Get an Entry based on the id and choosen language
app.get("/mehrsprachigkeit/:id/sprache/:lang", mehrsprachigkeit.findByIdAndLanguage);

//////////////////////////////////////////////////////////////////////////////////////////

};
