const db = require('../config/database');

/*
    borrowing_id: int,
    date_borrowed: text,
    date_return: text,
    user_id: string,
    book_id: int,
*/

const LOAN_PERIOD = 14;

function add(user_id, book_id) {
    const [borrowingDate, dueDate] = generateDates();
    const query = 'INSERT INTO Borrowing (date_borrowed, date_return, user_id, book_id)' +
        'VALUES(?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.run(query, [borrowingDate, dueDate, user_id, book_id], (error) => {
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
    const borrowingDate = `${today.getFullYear()}/` +
        `${today.getMonth().toString().padStart(2, '0')}/` +
        `${today.getDate().toString().padStart(2, '0')}`;

    const due = today.setDate(today.getDate() + LOAN_PERIOD);
    const returnDate = `${due.getFullYear()}/` +
        `${due.getMonth().toString().padStart(2, '0')}/` +
        `${due.getDate().toString().padStart(2, '0')}`;
    return [borrowingDate, returnDate];
}

module.exports = {
    add,
}