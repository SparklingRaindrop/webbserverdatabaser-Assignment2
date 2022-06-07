const db = require('../config/database');

/*
    title: string,
    isbn: string,
    author: string,
    publishYear: int,
    publisher: string,
*/

function getAll() {
    const query = 'SELECT * FROM books';
    
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

function getById(id) {
    const query = 'SELECT * FROM books WHERE id = ?';

    return new Promise ((resolve, reject) => {
        db.get(query, id, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function add(newBook) {
    const query = 
        'INSERT INTO books (title, isbn, author, publishYear, publisher)' +
        'VALUES (?, ?, ?, ?, ?)';
    const { title, isbn, author, publishYear, publisher } = newBook;

    return new Promise ((resolve, reject) => {
        db.run(query, [title, isbn, author, publishYear, publisher], (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

async function replace(id, newData) {
    const convertedNewData = convertToString(newData);
    const query = `UPDATE books SET ${convertedNewData} WHERE id = ${id}`;

    return new Promise ((resolve, reject) => {
        db.run(query, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function update(id, newData) {
    const convertedNewData = convertToString(newData);
    const query = `UPDATE books SET ${convertedNewData} WHERE id = ${id}`;

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
    const query = `DELETE FROM books WHERE id = ${id}`;

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

function convertToString(newData) {
    const entries = Object.entries(newData);
    const result = entries.map(entry => {
        if (entry[0] === 'publishYear') {
            return `${entry[0]} = ${entry[1]}`;
        }
        return `${entry[0]} = "${entry[1]}"`
    }).toString();
    return result;
}


module.exports = {
    getAll,
    getById,
    add,
    replace,
    update,
    remove
};