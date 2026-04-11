var jwt = require('jsonwebtoken');

module.exports = function isLoggedIn(req, res, next) {

    let token = req.headers['authorization']
    token = token && token.split(' ')[1] // Bearer <token>

    try {
        if (!token) {
            return res.status(401).json({ msg: "Please Login First" })
        }
        let decoded = jwt.verify(token, 'shhhhh');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token", error: err.message })
    }
}