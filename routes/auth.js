const express = require('express');
const passport = require('passport');
const authController = require('../controllers/auth');

const routes = express.Router();


routes.get('/auth/failed', authController.authFailed);

routes.get('/auth/github',
    passport.authenticate('github'));

routes.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:3000/paintings');
    }
);

module.exports = routes