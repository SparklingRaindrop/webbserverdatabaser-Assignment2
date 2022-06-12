const authModel = require('../models/auth.model');
const usersModel = require('../models/users.model');

async function getUserData(req, res) {
    // TokenChecker has made sure properties: userId, email
    const { id: userId, email } = req.user;

    // Check if User is valid
    const userData = await authModel.getByEmail(email)
        .catch(() => {
            res.status(500).send({
                error: 'Something went wrong on the server.'
            });
            return false;
        });
    if (!userData || userData.id !== userId) {
        res.status(403).send({
            error: `Token contains invalid data.`
        });
        return;
    }

    const borrowingList = await usersModel.getBorrowingByUserId(userId);
    res.send({
        user: userData,
        borrowing: borrowingList,
    });
}

module.exports = {
    getUserData,
}