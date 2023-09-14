const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        // Code
        const token = req.header('authtoken')
        if (!token) {
            return res.send('No Token, Authorization Denied!!!').status(401)
        }
        const decoded = jwt.verify(token, 'jwtsecret')
        req.user = decoded.user
        next()
    } catch (err) {
        console.log(err)
        res.status(500).send('Token Invalid!!!')
    }
}