const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const user = require('./models/user');
const passport = require('passport');


module.exports = function (passport) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            newUser = {
                githubId: profile.id,
                displayName: profile.displayName,
            }
            try {
                const user = awaitUser.findOrCreate(newUser);
                cb(null, user)
            } catch (error) {
                console.log({ failedOAuthLogin: error });
            }

        }
    )
    )
};



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        console.log({ deserializeUser: err });
        done(err);
    }
});

