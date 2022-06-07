const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./config/db.sqlite', (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
    const bookStatement = `
        CREATE TABLE IF NOT EXISTS Book (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            isbn TEXT,
            author TEXT,
            publishYear INTEGER,
            publisher TEXT
        );
    `;

    const userStatement = `
        CREATE TABLE IF NOT EXISTS User (
            id TEXT PRIMARY KEY,
            name TEXT,
            family_name TEXT,
            email TEXT UNIQUE,
            password TEXT
        );
    `;

    [bookStatement, userStatement].forEach(statement => {
        db.run(statement, (error) => {
            if (error) {
                console.error(error.message);
            }
        });
    })
});

module.exports = db;