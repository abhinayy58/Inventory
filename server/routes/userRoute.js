const express = require('express');
const router = express.Router();
const {userRegister} = require('../controllers/userController')

// Register routes

router.post('/register', userRegister)


module.exports = router;  