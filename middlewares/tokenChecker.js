const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.status(403).send('Token required');
        return;
    }
    // token = "BEARER (token)"
    const jwtToken = token.split(' ')[1];
    try {
        const decoded = jwt.verify(jwtToken, process.env.SECRET_KEY);
        req.user = decoded;
    } catch (error) {
        res.status(400).send('Invalid token.');
        return;
    }
    next();
}

module.exports = verifyToken;