const express = require('express');
const router = express.Router();
const { register, login, currentUser } = require('../controllers/auth');

const { auth } = require('../middlewares/auth');

// http://localhost:3000/api/register
router.post('/register', register);
router.post('/login', login);
router.post('/current-user', auth, currentUser);

module.exports = router;