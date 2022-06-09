const usersModel = require('../models/users.model');
const authModel = require('../models/auth.model');
const booksModel = require('../models/books.model');

const BORROWING_LIMIT = 5;

async function lendBook(req, res) {
    const incomingData = await handleIncomingData(req, res);
    if (!incomingData) return;
    const { bookId, userId, email } = incomingData;

    // Check if user exists
    if (!await isValidUser(email, res)) return;

    // Check if book exist in database
    if(!await isPresent(bookId, res)) return;

    // Check availability
    if (!await isAvailable(bookId, res)) return;

    // Check how many books the user is borrowing
    const borrowingCount = await usersModel.getBorrowingByUserId(userId)
        .catch(() => {
            res.status(500).send({
                error: 'Something went wrong on the server.',
                message: 'Please try again.'
            });
            return;
        })
        .then(data => {
            if (!data) return;
            return data.length;
        });
    if (borrowingCount >= BORROWING_LIMIT) {
        res.status(403).send({
            error: `This user is already borrowing ${BORROWING_LIMIT} books.`
        });
        return;
    }

    await usersModel.add(userId, bookId)
        .catch(() => {
            res.status(500).send({
                error: 'Something went wrong on the server.',
                message: 'Please try again.'
            });
            return;
        });
    res.send('Book is checked out successfully.');
}

async function returnBook(req, res) {
    const incomingData = await handleIncomingData(req, res);
    if (!incomingData) return;
    const { bookId, userId, email } = incomingData;

    // Check if user exists
    if(!await isValidUser(email, res)) return;

    // Check if book exist in database
    if(!await isPresent(bookId, res)) return;

    // Get borrowing data from the list
    const userBorrowingList = await usersModel.getBorrowingByUserId(userId)
        .catch(error => {
            res.status(400).send(error);
            return;
        });
    if (!userBorrowingList) {
        res.status(400).send({
            error: 'This user hasn\'t borrowed any book.'
        });
        return;
    }
    if (!userBorrowingList.some(book => book.book_id === bookId)) {
        res.status(400).send({
            error: 'This book is not borrowed by this user.'
        });
        return;
    }
    await usersModel.removeBorrowing(userId, bookId);
    res.send('Successfully returned');
}

async function handleIncomingData(req, res) {
    if (!req.body.hasOwnProperty('bookId') || typeof req.body.bookId !== 'number') {
        res.status(400).send({
            error: 'Expected bookId',
            message: 'Ensure to send bookId in correct type.'
        });
        return null;
    }

    const bookId = req.body.bookId;
    // TokenChecker has made sure properties: userId, email
    const {id: userId, email} = req.user;

    return {
        bookId,
        userId,
        email
    };
}

async function isValidUser(email, res) {
    const targetUser = await authModel.getByEmail(email)
        .catch(() => {
            res.status(500).send({
                error: 'Something went wrong on the server.'
            });
            return false;
        });
    // Decoded token contained an e-mail that doesn't exist on user list.
    if (!targetUser) {
        res.status(403).send({
            error: `Token contains invalid data.`
        });
        return false;
    }
    return true;
}

async function isPresent(bookId, res) {
    const targetBook = await booksModel.matchBy('id', bookId)
        .catch(() => {
            res.status(500).send({
                error: 'Something went wrong on the server.',
                message: 'Please try again.'
            });
            return false;
        });
    if (!targetBook) {
        res.status(404).send({
            error: `The book (ID: ${bookId}) doesn't exist in the database.)`
        });
        return false;
    }
    return true;
}

async function isAvailable(bookId, res) {
    const matchedBorrowing = await usersModel.getBorrowingByBookId(bookId)
        .catch(() => {
            res.status(500).send({
                error: 'Something went wrong on the server.',
                message: 'Please try again.'
            });
            return false;
        });
    if (matchedBorrowing) {
        res.status(400).send({
            error: 'This book is not available. Another user has already borrowed.'
        });
        return false;
    }
    return true;
}

module.exports = {
    lendBook,
    returnBook
}