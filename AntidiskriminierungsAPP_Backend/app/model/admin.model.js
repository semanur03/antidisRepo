const sql = require("../db/webDaten.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Constructor
const User = function(user) {
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
};

User.findById = (id, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        admin 
    WHERE 
        id = ?
    `;

    sql.get(query, [id], (err, res) => {
        if (err) {
            console.log("Error while retrieving User with Id: ", err)
            result(err, null);
            return;
        }
        
        if(res) {
            console.log("found User: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.findByUsername = (username, result) => {
    if (!username) {
        console.error("Username is required");
        return callback(new Error("Username is required"), null);
    }
    const query = `
    SELECT 
        * 
    FROM 
        admin 
    WHERE 
        username = ?
    `;
    console.log(`Executing query: ${query} with username: ${username}`); // Debug log
    sql.get(query, [username], (err, res) => {
        if (err) {
            console.log("Error while retrieving User with username: ", err)
            result(err, null);
            return;
        }
         if(res) {
            console.log("found User: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.findByEmail = (email, result) => {
    const query = `
    SELECT 
        * 
    FROM 
        admin 
    WHERE 
        email = ? COLLATE NOCASE 
    `; // Case-insensitive search 

    sql.get(query, [email], (err, res) => {
        if (err) {
            console.log("Error while retrieving User with email: ", err)
            result(err, null);
            return;
        }
        if(res) {
            console.log("found User: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.create = (newUser, result) => {
    // First check if username or email exists
    User.findByUsername(newUser.username, (err, usernameExists) => {
        if (err && err.kind !== "not_found") {
            console.error("Username Check Error:", err);
            return result(err);
        }
        
        if (usernameExists) {
            console.log("Username existiert bereits");
            return result({ kind: "username_exists" });
        }

        User.findByEmail(newUser.email, (err, emailExists) => {
            if (err && err.kind !== "not_found") {
                console.error("Email Check Error:", err);
                return result(err);
            }
            
            if (emailExists) {
                console.log("Email existiert bereits");
                return result({ kind: "email_exists" });
            }

            // Hash password before saving
            bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
                if (err) {
                    console.error("Bcrypt Error:", err);
                    return result(err);
                }

                console.log("Password succesfully hashed");
                
                // 4. Datenbank-Insert
                const query = `
                INSERT INTO 
                    admin (username, password, email) 
                VALUES 
                    (?, ?, ?)
                `;
                sql.run(query, [newUser.username, hash, newUser.email], function(err) {
                    if (err) {
                        console.error("Database Insert Error:", err);
                        return result(err);
                    }
                    
                    console.log("succesfully created user with id:", this.lastID);
                    result(null, {
                        id: this.lastID,
                        username: newUser.username,
                        email: newUser.email
                    });
                });
            });
        });
    });
};

User.getAll = (result) => {
    const query = `
    SELECT 
        * 
    FROM 
        admin
    `;

    sql.all(query, [], (err, res) => {
        if (err) {
            console.error("Error while retrieving all users:", err);
            result(err, null);
            return;
        }
        
        console.log("All User: ", res);
        result(null, res);
    });
};

//Check Login: search for username + compare password
User.login = (username, password, result) => {
    User.findByUsername(username, (err, user) => {
        if (err) return result(err, null);
        if (!user) return result({ kind: "not_found" }, null);

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return result(err, null);
            if (!isMatch) return result({ kind: "wrong_password" }, null);
            
            // Successful login - return user without password
            const safeUser = {
                id: user.id,
                username: user.username,
                email: user.email
            };
            result(null, safeUser);
        });
    });
};

User.update = async (id, user, result) => {
    try {
        // Check for username/email uniqueness first
        if (user.username) {
            const existingUser = await new Promise((resolve, reject) => {
                sql.get("SELECT id FROM admin WHERE username = ? AND id != ?", 
                      [user.username, id], (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            });
            if (existingUser) return result({ kind: "username_exists" }, null);
        }

        if (user.email) {
            const existingEmail = await new Promise((resolve, reject) => {
                sql.get("SELECT id FROM admin WHERE email = ? AND id != ?", 
                      [user.email, id], (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            });
            if (existingEmail) return result({ kind: "email_exists" }, null);
        }

        // Build dynamic query
        const fields = [];
        const values = [];
        
        if (user.username) {
            fields.push("username = ?");
            values.push(user.username);
        }
        if (user.email) {
            fields.push("email = ?");
            values.push(user.email);
        }
        if (user.password) {
            fields.push("password = ?");
            values.push(user.password);
        }

        if (fields.length === 0) {
            return result({ kind: "no_fields" }, null);
        }

        values.push(id);

        const query = `UPDATE admin SET ${fields.join(", ")} WHERE id = ?`;
        
        sql.run(query, values, function(err) {
            if (err) return result(err, null);
            if (this.changes === 0) return result({ kind: "not_found" }, null);
            
            result(null, { 
                id: id,
                username: user.username,
                email: user.email
            });
        });
    } catch (err) {
        result(err, null);
    }
};

User.remove = (id, result) => {    
    const query = `
    DELETE FROM 
        admin 
    WHERE 
        id = ?
    `;

    sql.run(query, [id], function(err) {
        if (err) {
            console.log("Error while deleting User: ", err);
            result(err, null);
            return;
        }
        if (this.changes === 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted user with id: ", id, " Changes: ", this.changes);
        result(null, { 
            message: "succesfully deleted user",
            id: id,
            changes: this.changes,
        });
    });
};

module.exports = User;
