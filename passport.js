const GitHubStrategy = require('passport-github').Strategy;
const userController = require('./controllers/users');
const User = require('./models/user');
const passport = require('passport');
const mongodb = require('./db/connect');

const database = mongodb.getDb().db('paintings').collection('users');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github"
},
    async function (accessToken, refreshToken, profile, cb) {
        const newUser = {
            githubId: profile.id,
            displayName: profile.displayName,
            createdAt: new Date(),
        }
        try {

            const user = await database.findOne({ githubId: profile.id });
            console.log(user);
            if (user) {
                return cb(null, user)
    
            } else {
                user = await userController.addUser(profile);
                return cb(null, user);
            }
    
        } catch (error) {
            throw error;
        }

    }
)
)




passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.githubId);
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

