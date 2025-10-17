const User = require("../model/admin.model.js");
const bcrypt = require('bcrypt');
const { transporter } = require('../../index.js');


exports.register = async (req, res) => {
    if (!req.body || !req.body.username || !req.body.password || !req.body.email) {
        console.error('missing fields:', req.body);
        return res.status(400).json({
            error: "Username, password and email are required",
            received: req.body
        });
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    User.create(user, (err, data) => {
        if (err) {
            console.error('register error:', {
                error: err,
                stack: err.stack
            });

            if (err.kind === "username_exists") {
                return res.status(400).json({
                    error: "Username already exists",
                    suggestion: "please choose another username"
                });
            }
            if (err.kind === "email_exists") {
                return res.status(400).json({
                    error: "Email already exists",
                    suggestion: "please user another e-mail adress"
                });
            }
            
            // SQLite Fehler abfangen
            if (err.code === "SQLITE_CONSTRAINT") {
                return res.status(400).json({
                    error: "Database constraint failed",
                    details: err.message
                });
            }

            return res.status(500).json({
                error: "Error creating user",
                systemError: err.message,
                code: err.code
            });
        }
        
        console.log('succfesfully registered:', data.username);

        // ---------------------------
        // Mail an den neuen Admin senden
        // ---------------------------
        var mailOptions = {
            from: process.env.from,
            to: data.email,
            subject: "Dein Antidis Admin-Account wurde erstellt",
            text: "Hallo " + data.username + ",\n\n" +
                "Dein Admin-Account wurde erfolgreich erstellt.\n" +
                "Benutzername: " + data.username + "\n" +
                "Passwort: " + req.body.password + "\n\n" +
                "Bitte ändere dein Passwort nach der ersten Anmeldung.\n\n" +
                "Du kannst dich hier anmelden: https://antidis.f4.htw-berlin.de/login-forwarder\n\n" +
                "Viele Grüße,\nDein Admin-Team",
            html: `
                <p>Hallo <strong>${data.username}</strong>,</p>
                <p>Dein Admin-Account wurde erfolgreich erstellt.</p>
                <p>Benutzername: <strong>${data.username}</strong><br>
                Passwort: <strong>${req.body.password}</strong></p>
                <p>Bitte ändere dein Passwort nach der ersten Anmeldung.</p>
                <p><a href="https://antidis.f4.htw-berlin.de/login-forwarder" target="_blank">Hier anmelden</a></p>
                <p>Viele Grüße,<br>Dein Admin-Team</p>
            `
        };

        transporter.sendMail(mailOptions, function(mailErr, info) {
            if (mailErr) {
                console.error('Error sending admin creation email:', mailErr);
            } else {
                console.log('Admin creation email sent:', info.response);
            }
        });

        res.status(201).json({
            success: true,
            user: {
                id: data.id,
                username: data.username,
                email: data.email
            }
        });
    });
};

// Admin User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            error: 'Username and password are required' 
        });
    }

    User.login(username, password, (err, user) => {
        if (err) {
            switch (err.kind) {
                case "not_found":
                    return res.status(400).json({ 
                        error: 'Username does not exist' 
                    });
                case "wrong_password":
                    return res.status(401).json({ 
                        error: 'Wrong password' 
                    });
                default:
                    return res.status(500).json({ 
                        error: 'Something went wrong' 
                    });
            }
        }
        
        // Successful login
        res.status(200).json({ 
            message: 'Logged in',
            user: user
        });
    });
};

// Retrieve all User from the database
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err) 
            return res.status(500).send({
                message: 
                    err.message || "Some error occured while retrieveing User."
            });
        else return res.send(data);
    });
};

// Find a single User with a user_id
exports.findOne = (req, res) => {
    User.findById(req.params.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found User with id ${req.params.user_id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving User with id " + req.params.user_id
                });
            }
        } else return res.send(data);
    });
};

// Find a single User with a username
exports.findByUsername = (req, res) => {
    User.findByUsername(req.params.name, (err, user) => {
        if (err) 
            return res.status(500).send({ 
                message: err.message 
            });
        if (!user) 
            return res.status(404).send({ 
                message: "User not found" 
            });
        res.send(user);
    });
};

// Find a single User with a email
exports.findByEmail = (req, res) => {
    User.findByEmail(req.params.email, (err, user) => {
        if (err) 
            return res.status(500).send({ 
                message: err.message 
            });
        if (!user) 
            return res.status(404).send({ 
                message: "User not found" 
            });
        res.send(user);
    });
};

exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Content cannot be empty" });
    }

    try {
        // Verify user exists
        const user = await new Promise((resolve, reject) => {
            User.findById(req.params.id, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Password verification
        if (!req.body.currentPassword) {
            return res.status(400).json({ error: "Current password is required" });
        }

        const passwordMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(403).json({ error: "Current password is incorrect" });
        }

        // Prepare updates
        const updates = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.newPassword 
                ? await bcrypt.hash(req.body.newPassword, 10) 
                : undefined
        };

        // Execute update
        const updatedUser = await new Promise((resolve, reject) => {
            User.update(req.params.id, updates, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // ---------------------------
        // Update Mail an den Admin senden
        // ---------------------------
        const recipients = [user.email]; // alte E-Mail
        if (updates.email && updates.email !== user.email) {
            recipients.push(updates.email); // neue E-Mail hinzufügen
        }

        var mailOptions = {
            from: process.env.from,
            to: recipients.join(','),
            subject: "Dein Antidis Admin-Account wurde aktualisiert",
            text: "Hallo " + updatedUser.username + ",\n\n" +
                  "Dein Antidis Admin-Account wurde erfolgreich aktualisiert.\n" +
                  "Benutzername: " + updatedUser.username + "\n" +
                  (req.body.newPassword ? "Neues Passwort: " + req.body.newPassword + "\n" : "") +
                  (updates.email && updates.email !== user.email ? "Neue E-Mail: " + updates.email + "\n" : "") +
                  "\nDu kannst dich hier anmelden: https://antidis.f4.htw-berlin.de/login-forwarder\n\n" +
                  "Viele Grüße",
            html: `
                <p>Hallo <strong>${updatedUser.username}</strong>,</p>
                <p>Dein Admin-Account wurde erfolgreich aktualisiert.</p>
                <p>Benutzername: <strong>${updatedUser.username}</strong><br>
                ${req.body.newPassword ? `Neues Passwort: <strong>${req.body.newPassword}</strong><br>` : ""}
                ${updates.email && updates.email !== user.email ? `Neue E-Mail: <strong>${updates.email}</strong><br>` : ""}
                </p>
                <p><a href="https://antidis.f4.htw-berlin.de/login-forwarder" target="_blank">Hier anmelden</a></p>
                <p>Viele Grüße</p>
            `
        };

        transporter.sendMail(mailOptions, function(mailErr, info) {
            if (mailErr) {
                console.error('Error sending admin update email:', mailErr);
            } else {
                console.log('Admin update email sent:', info.response);
            }
        });

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        if (err.kind === "username_exists") {
            return res.status(400).json({ error: "Username already exists" });
        }
        if (err.kind === "email_exists") {
            return res.status(400).json({ error: "Email already exists" });
        }
        if (err.kind === "no_fields") {
            return res.status(400).json({ error: "No valid fields to update" });
        }
        
        console.error("Update error:", err);
        res.status(500).json({ error: "Error updating user" });
    }
};

// delete Admin User 
exports.delete = (req, res) => {
    // Zuerst den User abrufen, um die E-Mail zu bekommen
    User.findById(req.params.id, (err, user) => {
        if (err) {
            if(err.kind === "not_found") {
                return res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                return res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        }

        // Wenn User gefunden, Mail vorbereiten
        var mailOptions = {
            from: process.env.from,
            to: user.email, // Mail an die E-Mail des gelöschten Users
            subject: "Dein Antidis Admin-Account wurde gelöscht",
            text: "Hallo " + user.username + ",\n\n" +
                  "Dein Admin-Account wurde gelöscht.\n\n" +
                  "Viele Grüße,\nDein Admin-Team",
            html: `
                <p>Hallo <strong>${user.username}</strong>,</p>
                <p>Dein Admin-Account wurde gelöscht.</p>
                <p>Viele Grüße,<br>Dein Admin-Team</p>
            `
        };

        transporter.sendMail(mailOptions, (mailErr, info) => {
            if (mailErr) {
                console.error('Error sending admin deletion email:', mailErr);
            } else {
                console.log('Admin deletion email sent:', info.response);
            }
        });

        // Danach den User löschen
        User.remove(req.params.id, (err, data) => {
            if (err) {
                if(err.kind === "not_found") {
                    return res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    return res.status(500).send({
                        message: "Could not delete User with id " + req.params.id
                    });
                }
            } else return res.json({
                message: `User ${data.id} deleted`,
                changes: data.changes,
                timestamp: new Date().toISOString()
            });
        });
    });
};

