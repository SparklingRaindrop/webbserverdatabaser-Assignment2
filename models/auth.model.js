const db = require('../config/database');
const { prepareQuery } = require('../JS/queryHandler');
/* 
    id: 'string',
    name: 'string',
    familyName: 'string',
    email: 'string',
    password: 'string',
*/

async function add(newUser) {
    const { parameters } = prepareQuery(newUser);
    const targets = Object.keys(parameters).join(', ');
    const query =
        'INSERT INTO User (id, name, family_name, email, password) ' + 
        `VALUES (${targets});`;

    return new Promise((resolve, reject) => {
        db.run(query, parameters, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(newUser.email);
        });
    }).then((email) =>  {
        return new Promise(function(resolve, reject) {
            db.get('SELECT id, name, family_name, email FROM User WHERE email = $email;', {
                $email: email
            }, (error, result) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                }
                resolve(result);
            });
        });
    });;
}

function getByEmail(email) {
    const query = 'SELECT id, name, family_name, email FROM User WHERE email = $email;';
    return new Promise((resolve, reject) => {
        db.get(query, {
            $email: email
        }, (error, row) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(row);
        });
    });
}

// Only auth purpose
function getPasswordByEmail(email) {
    const query = 'SELECT password FROM User WHERE email = $email;';
    return new Promise((resolve, reject) => {
        db.get(query, {
            $email: email
        }, (error, row) => {
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
    getAllUsers,
    getPasswordByEmail
};