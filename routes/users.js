const express = require('express')
const router = express.Router();
const passport =require('passport')
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

// these methods are define in controllers folder

// render register page 
router.get('/register', users.renderRegister);

// submit the register logic
router.post('/register', catchAsync(users.register))

router.get('/login', users.renderLogin);

// login
                            // using the local strategy
router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

//logout
router.get('/logout', users.logout)

module.exports = router;