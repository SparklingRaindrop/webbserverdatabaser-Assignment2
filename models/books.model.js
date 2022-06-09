const db = require('../config/database');

/*
    title: string(required),
    isbn: string(required),
    author: string(required),
    publishYear: int,
    publisher: string,
*/

function getAll() {
    const query = 'SELECT * FROM Book';
    
    return new Promise((resolve, reject) => {
        db.all(query, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function matchBy(column, row) {
    const query = `SELECT * FROM Book WHERE ${column} = $value`;
    return new Promise ((resolve, reject) => {
        db.get(query, {
            $value: row
        }, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function add(book) {
    const query = 
        'INSERT INTO Book (title, isbn, author, publish_year, publisher)' +
        'VALUES ($title, $isbn, $author, $publishYear, $publisher)';
    const { title, isbn, author, publishYear, publisher } = book;

    return new Promise ((resolve, reject) => {
        db.run(query, {
            $title: title,
            $isbn: isbn,
            $author: author,
            $publishYear: publishYear,
            $publisher: publisher,
        }, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function update(id, newData) {
    const convertedNewData = convertToString(newData);
    const query = `UPDATE Book SET ${convertedNewData} WHERE id = ${id}`;

    return new Promise ((resolve, reject) => {
        db.run(query, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function remove(id) {
    const query = `DELETE FROM Book WHERE id = ${id}`;

    return new Promise ((resolve, reject) => {
        db.run(query, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function getAllAvailableBooks() {
    const query = 'SELECT Book.id, title FROM Book ' +
        'LEFT JOIN Borrowing ON book_id = Book.id WHERE book_id IS NULL;';
    return new Promise ((resolve, reject) => {
        db.all(query, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function convertToString(newData) {
    const entries = Object.entries(newData);
    const result = entries.map(entry => {
        // publishYear is integer
        if (entry[0] === 'publishYear') {
            return `publish_year = ${entry[1]}`;
        }
        return `${entry[0]} = "${entry[1]}"`
    }).toString();
    return result;
}


module.exports = {
    getAll,
    matchBy,
    add,
    update,
    remove,
    getAllAvailableBooks
};