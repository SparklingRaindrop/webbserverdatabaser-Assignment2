const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./config/db.sqlite', (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    }
    const bookStatement = `
        CREATE TABLE IF NOT EXISTS Book (
            book_id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            isbn TEXT,
            author TEXT,
            publish_year INTEGER,
            publisher TEXT
        );
    `;

    const userStatement = `
        CREATE TABLE IF NOT EXISTS User (
            user_id TEXT PRIMARY KEY,
            name TEXT,
            family_name TEXT,
            email TEXT UNIQUE,
            password TEXT
        );
    `;

    const borrowingStatement = `
    CREATE TABLE IF NOT EXISTS Borrowing (
        borrowing_id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_borrowed TEXT,
        date_return TEXT,
        user_id TEXT NOT NULL,
        book_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User (user_id),
        FOREIGN KEY (book_id) REFERENCES User (book_id)
    );
`;

    [bookStatement, userStatement, borrowingStatement].forEach(statement => {
        db.run(statement, (error) => {
            if (error) {
                console.error(error.message);
            }
        });
    })
});

module.exports = db;