const db = require('../config/database');
/* 
    id: 'string',
    name: 'string',
    familyName: 'string',
    email: 'string',
    password: 'string',
*/

function add(newUser) {
    const query =
        'INSERT INTO User (id, name, family_name, email, password) ' + 
        'VALUES (?, ?, ?, ?, ?);';
    const arguments = Object.values(newUser);

    return new Promise((resolve, reject) => {
        db.run(query, arguments, (error, result) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(result);
        });
    });
}

function getByEmail(email) {
    const query = 'SELECT * FROM User WHERE email = ?;';
    return new Promise((resolve, reject) => {
        db.get(query, email, (error, row) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(row);
        });
    });
}

// For testing purpose
function getAllUsers() {
    const query = 'SELECT * FROM User;';
    return new Promise((resolve, reject) => {
        db.all(query, (error, result) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(result);
        });
    });
}

module.exports = {
    add,
    getByEmail,
    getAllUsers
};