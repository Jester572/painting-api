const express = require('express');
const passport = require('passport');
const routes = express.Router()

routes.get('/auth',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

routes.get('/auth/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/auth/callback');
  });

module.exports = routes