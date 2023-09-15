const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

exports.register = async (req, res) => {
    try {
        //code
        // 1.CheckUser
        const { name, password } = req.body
        var user = await User.findOne({ name })
        // console.log(user)
        if (user) {
            return res.send('User Already Exists!!!').status(400)
        }
        // 2.Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            password
        })
        user.password = await bcrypt.hash(password, salt)
        // 3.Save
        await user.save()
        res.send('Register Success!!')

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.login = async (req, res) => {
    try {
        //code
        // 1. Check User
        const { name, password } = req.body
        var user = await User.findOneAndUpdate({ name }, { new: true })
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).send('Password Invalid!!!')
            }
            // 2. Payload
            var payload = {
                user: {
                    name: user.name,
                    role: user.role
                }
            }
            // 3. Generate
            jwt.sign(payload, 'jwtsecret', { expiresIn: '1d' }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload })
            })
        } else {
            return res.status(400).send('User not found!!!')
        }

    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.currentUser = async (req, res) => {
    try {
        // code
        console.log(req.user)
        const user = await User.findOne({ name: req.user.name }).select('-password').exec()
        res.send(user)
    } catch (err) {
        //code
        console.log(err)
        res.status(500).send('Server Error')
    }
}