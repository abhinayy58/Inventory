const express = require('express');
const router = express.Router();
const {userRegister, userLogin, logOut} = require('../controllers/userController')

// Register routes

router.post('/register', userRegister)
router.post('/login', userLogin)
router.get('/logout', logOut)

module.exports = router;  