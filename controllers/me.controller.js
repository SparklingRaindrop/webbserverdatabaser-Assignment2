const res = require('express/lib/response');
const authModel = require('../models/auth.model');
const userModel = require('../models/users.model');

async function getUserData(req, res) {
    // TokenChecker has made sure properties: userId, email
    const { id: userId, email } = req.user;

    const userData = await authModel.getByEmail(email);
    const borrowingRecord = await userModel.getBorrowingByUserId(userId)
    res.send({
        user: userData,
        borrowing: borrowingRecord,
    });
}

module.exports = {
    getUserData,
}