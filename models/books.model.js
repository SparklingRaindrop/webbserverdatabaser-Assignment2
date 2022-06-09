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
    const { targets, parameters } = prepareQuery(newData);
    const query = `UPDATE Book SET ${targets} WHERE id = $id`;

    return new Promise ((resolve, reject) => {
        db.run(query, {
            $id: id,
            ...parameters
        }, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function remove(id) {
    const query = `DELETE FROM Book WHERE id = $id`;

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

function prepareQuery(newDataObj) {
    const targets = Object.keys(newDataObj).reduce((result, key) => {
        result += `${result !== '' ? ', ' : ''}${key} = $${key}`;
        return result;
    }, '');

    const parameters = {...newDataObj};
    for (const property in newDataObj) {
        parameters[`$${property}`] = newDataObj[property];
        delete parameters[property];
    }

    return {
        targets,
        parameters
    };
}


module.exports = {
    getAll,
    matchBy,
    add,
    update,
    remove,
    getAllAvailableBooks
};