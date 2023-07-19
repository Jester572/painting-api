const GitHubStrategy = require('passport-github').Strategy;
const userController = require('./controllers/users');
const User = require('./models/user');
const passport = require('passport');



passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        newUser = {
            githubId: profile.id,
            displayName: profile.displayName,
        }
        try {
            console.log(newUser);
            //create an if statement to find or create a new user in place of what is below. 
            //I think this should work... Hopefully. 
            //finnish the users controller to accomplish this
            const user = await userController.getSingleUser(newUser);
            cb(null, user)
        } catch (error) {
            console.log({ failedOAuthLogin: error });
        }

    }
)
)




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

