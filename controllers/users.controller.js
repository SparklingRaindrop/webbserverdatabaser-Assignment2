const model = require('../models/users.model');

function lendBook() {
    model.add(userId, bookId);
}

function returnBook() {

}

module.exports = {
    lendBook,
    returnBook
}