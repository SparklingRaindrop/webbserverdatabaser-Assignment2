const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).send({
            error: 'Token is required',
            message: 'Please log in first'
        });
        return;
    }
    // token = "BEARER (token)"
    const jwtToken = token.split(' ')[1];

    try {
        const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
        if (!decoded.hasOwnProperty('id') || !decoded.hasOwnProperty('email')) {
            throw 'Token is invalid';
        }

        req.user = decoded;
    } catch (error) {
        res.status(401).send({
            error: 'Invalid token.',
            message: error.message
        });
        return;
    }
    next();
}

module.exports = verifyToken;