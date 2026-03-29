let jwt = require('jsonwebtoken');

let isLogin = (role) => {
    return (req, res, next) => {

        let token = req.headers?.authorization?.split(" ")[1]

        if (token) {

            let decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (decoded) {

                if (decoded.role != role) {
                    res.status(400).json({ msg: "UnAuthorized " })
                } else {
                    req.user = decoded.userId
                    next()
                }

            } else {
                res.status(403).json({ msg: "Login Failed Please try again" })
            }

        }
        else
            res.status(400).json({ msg: "UnAuthorized " })
    }
}

module.exports = isLogin