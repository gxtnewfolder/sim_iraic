const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.auth = async (req, res, next) => {
    try {
        //code
        const token = req.headers["authtoken"]
        if (!token) {
            return res.status(401).send('No token')
        }
        const decoded = jwt.verify(token, 'jwtsecret')
        req.user = decoded.user
        
        next();
    } catch (err) {
        // err
        console.log(err)
        res.send('Token Invalid').status(500)
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