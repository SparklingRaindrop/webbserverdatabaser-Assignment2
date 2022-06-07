const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./config/db.sqlite', (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
    const statement = `
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            isbn TEXT,
            author TEXT,
            publishYear INTEGER,
            publisher TEXT
        )
    `;

    db.run(statement, (error) => {
        if (error) {
            console.error(error.message);
        }
    })
});

module.exports = db;