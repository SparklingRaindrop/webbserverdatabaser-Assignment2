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
        const expireDate = new Date(decoded.exp * 1000);
        if (expireDate < new Date()) {
            res.status(401).send({
                error: 'Token is expired.',
                messgae: 'Please log in again.'
            });
            return;
        }

        if (!decoded.hasOwnProperty('id') || !decoded.hasOwnProperty('email')) {
            throw 'Token is invalid';
        }

        req.user = decoded;
    } catch (error) {
        res.status(401).send({
            error: 'Invalid token.'
        });
        return;
    }
    next();
}

module.exports = verifyToken;