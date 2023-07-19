const express = require('express');
const passport = require('passport');
const routes = express.Router()

routes.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

routes.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000/paintings');
  });

module.exports = routes