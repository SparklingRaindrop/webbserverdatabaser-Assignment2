const sqlite3 = require('sqlite3').verbose();

// Add sample data
const addSampleData = require('../sampleData');

const db = new sqlite3.Database('./config/db.sqlite', (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
    const bookStatement = `
        CREATE TABLE IF NOT EXISTS Book (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            isbn TEXT NOT NULL,
            author TEXT NOT NULL,
            publish_year INTEGER,
            publisher TEXT,
            language TEXT,
            genre TEXT
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

    const borrowingStatement = `
    CREATE TABLE IF NOT EXISTS Borrowing (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_borrowed TEXT,
        date_return TEXT,
        user_id TEXT NOT NULL,
        book_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User (id),
        FOREIGN KEY (book_id) REFERENCES Book (id)
    );
`;

    [bookStatement, userStatement, borrowingStatement].forEach(statement => {
        db.run(statement, (error) => {
            if (error) {
                console.error(error.message);
            }
        });
    });

    addSampleData(db);
});

module.exports = db;