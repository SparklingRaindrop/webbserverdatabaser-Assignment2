const db = require('../config/database');

/*
    borrowing_id: int,
    date_borrowed: text,
    date_return: text,
    id: string,
    book_id: int,
*/

const LOAN_PERIOD = 14;

function add(userId, bookId) {
    const [borrowingDate, dueDate] = generateDates();
    const query = 'INSERT INTO Borrowing (date_borrowed, date_return, user_id, book_id)' +
        'VALUES(?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.run(query, [borrowingDate, dueDate, userId, bookId], (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function getBorrowingByBookId(book_id) {
    const query = 'SELECT * FROM Borrowing WHERE book_id = $id';

    return new Promise((resolve, reject) => {
        db.get(query, {
            "$id": book_id
        }, (error, row) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(row);
        });
    });
}

function getBorrowingByUserId(userId) {
    const query = 'SELECT * FROM Borrowing WHERE user_id = $userId';

    return new Promise((resolve, reject) => {
        db.all(query, {
            $userId: userId
        }, (error, rows) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve(rows);
        });
    });
}

function removeBorrowing(userId, book_id) {
    const query = 'DELETE FROM Borrowing WHERE user_id = $user_id AND book_id = $book_id;';
    return new Promise((resolve, reject) => {
        db.run(query, {
            $user_id: userId,
            $book_id: book_id
        }, (error) => {
            if (error) {
                console.error(error.message);
                reject(error);
            }
            resolve();
        });
    });
}

function generateDates() {
    //YYMMDD
    const today = new Date();
    // getMonth() returns index number
    const borrowingMonth = today.getMonth() + 1;
    const borrowingDate = `${today.getFullYear()}/` +
        `${borrowingMonth.toString().padStart(2, '0')}/` +
        `${today.getDate().toString().padStart(2, '0')}`;

    const due = new Date();
    const dueMonth = due.getMonth() + 1;
    due.setDate(today.getDate() + LOAN_PERIOD);
    const returnDate = `${due.getFullYear()}/` +
        `${dueMonth.toString().padStart(2, '0')}/` +
        `${due.getDate().toString().padStart(2, '0')}`;
    return [borrowingDate, returnDate];
}

module.exports = {
    add,
    getBorrowingByBookId,
    getBorrowingByUserId,
    removeBorrowing
}