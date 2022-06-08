const usersModel = require('../models/users.model');
const authModel = require('../models/auth.model');
const booksModel = require('../models/books.model');

const BORROWING_LIMIT = 10;

async function lendBook(req, res) {
    if (!req.body.hasOwnProperty('id') ||
        !req.hasOwnProperty('user') ||
        !req.user.hasOwnProperty('email')
    ) {
        res.status(400).send('Book details are required.');
        return;
    }

    const bookId = req.body.id;
    const userId = req.user.id;

    // Check if user exists
    const targetUser = await authModel.getByEmail(req.user.email)
        .catch(error => {
            res.status(400).send(error);
            return;
        });
    if (!targetUser) {
        res.status(400).send(`Can\'t find the user data. ID(${userId})`);
        return;
    }

    // Check if book exist in database
    const targetBook = await booksModel.getById(bookId)
        .catch(error => {
            res.status(400).send(error);
            return;
        });
    if (!targetBook) {
        res.status(400).send(`Can\'t find the book with ID(${bookId}`);
        return;
    }

    // Check availability
    const matchedBorrowing = await usersModel.getBorrowingByBookId(bookId)
        .catch(error => {
            res.status(400).send(error);
            return;
        });
    if (matchedBorrowing) {
        res.status(400).send('This book is not available. Another user has borrowed.');
        return;
    }

    // Check how many books the user is borrowing
    const borrowingCount = await usersModel.getBorrowingByUserId(userId)
        .catch(error => {
            res.status(400).send(error);
            return;
        })
        .finally(data => {
            if (!data) return;
            return data.length;
        });
    if (borrowingCount >= BORROWING_LIMIT) {
        res.status(400).send(`This user is already borrowing ${BORROWING_LIMIT} books.`);
        return;
    } 

    await usersModel.add(userId, bookId)
        .catch(error => {
            res.status(400).send(error);
            return;
        });
    res.send('Book is checked out successfully.');
}

async function returnBook(req, res) {
    if (!req.body.hasOwnProperty('id') ||
        !req.hasOwnProperty('user') ||
        !req.user.hasOwnProperty('id')
    ) {
        res.status(400).send('Book ID is required.');
        return;
    }

    const bookId = req.body.book_id;
    const {email, id: userId} = req.user;

    // Check if user exists
    const targetUser = await authModel.getByEmail(email)
        .catch(error => {
            res.status(400).send(error);
            return;
        });
    if (!targetUser) {
        res.status(404).send(`The user doesn't exist in the database.)`);
        return;
    }

        // Check if user exists
    const targetBook = await booksModel.getById(bookId)
        .catch(error => {
            res.status(400).send(error);
            return;
    });
    if (!targetBook) {
        res.status(404).send(`The book doesn't exist in the database.)`);
        return;
    }

    // Check if book is in borrowing list
    const userBorrowingList = await usersModel.getBorrowingByUserId(userId)
        .catch(error => {
            res.status(400).send(error);
            return;
        });
    if (!userBorrowingList) {
        res.status(400).send('This user hasn\'t borrowed any book.');
        return;
    }
    if (!userBorrowingList.some(book => book.book_id === bookId)) {
        res.status(400).send('This book is not borrowed by this user.');
        return;
    }
    await usersModel.removeBorrowing(userId, bookId);
    res.send('Successfully returned');
}

module.exports = {
    lendBook,
    returnBook
}