const db = require('../config/database');
const { prepareQuery } = require('../JS/queryHandler');

/*
    id: int,
    title: string(required),
    isbn: string(required),
    author: string(required),
    publish_year: int,
    publisher: string,
    language: string,
    genre: string
*/

function getAll() {
    const query = 'SELECT title, isbn, author, publish_year, publisher, language, genre, ' +
    'COUNT(title) AS own, ' +
    'COUNT(title) - COUNT(Borrowing.id) AS available FROM Book ' +
    'LEFT JOIN Borrowing ON book_id = Book.id ' +
    'GROUP BY title;';

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

function getById(id) {
    // Because SQLite doesn't support boolean, if it's available it will return 1
    const query = 'SELECT Book.*, ' +
    'CASE WHEN Borrowing.id IS NULL THEN 1 ELSE 0 END AS available, ' +
    'CASE WHEN date_return IS NULL THEN "N/A" ELSE date_return END AS return_date FROM Book ' +
    'LEFT JOIN Borrowing ON book_id = $id WHERE Book.id = $id;';

    return new Promise ((resolve, reject) => {
        db.get(query, {
            $id: id
        }, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function matchBy(column, row) {
    const query = `SELECT * FROM Book WHERE ${column} = $value;`;
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

async function add(newBook) {
    const { parameters } = prepareQuery(newBook);
    const query = 
        'INSERT INTO Book (title, isbn, author, publish_year, publisher, language, genre )' +
        `VALUES ($title, $isbn, $author, $publish_year, $publisher, $language, $genre);`;

    return new Promise ((resolve, reject) => {
        db.run(query, parameters, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    }).then(() =>  {
        return new Promise(function(resolve, reject) {
            db.get('SELECT * FROM Book WHERE id = (SELECT MAX(id) FROM Book);', (error, row) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                }
                resolve(row);
            });
        });
    });
}

async function update(id, newData) {
    const { targets, parameters } = prepareQuery(newData);
    const query = `UPDATE Book SET ${targets} WHERE id = $id;`;

    return new Promise ((resolve, reject) => {
        db.run(query, {
            $id: id,
            ...parameters
        }, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(id);
        });
    }).then((id) =>  {
        return new Promise(function(resolve, reject) {
            db.get('SELECT * FROM Book WHERE id = $id;',{
                $id: id
            }, (error, row) => {
                if (error) {
                    console.error(error.message);
                    reject(error);
                }
                resolve(row);
            });
        });
    });
}

function remove(id) {
    const query = `DELETE FROM Book WHERE id = $id;`;

    return new Promise ((resolve, reject) => {
        db.run(query, {
            $id: id,
        },(error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

module.exports = {
    getAll,
    getById,
    matchBy,
    add,
    update,
    remove,
};