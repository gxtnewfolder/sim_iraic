const jwt = require('jsonwebtoken')
const User = require('../models/User')

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

exports.adminCheck = async (req, res, next) => {
    try {
        // Code
        console.log(req.user.name)
        const userAdmin = await User.findOne({ name: req.user.name })
        .select('-password')
        .exec()

        if (userAdmin.role !== 'admin') {
            return res.send('Admin Access Denied!!!').status(403)
        } else {
            next()
        }
    } catch (err) {
        console.log(err)
        res.status(403).send('Admin Access Denied!!!')
    }
}