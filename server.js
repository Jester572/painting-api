const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const myPassport = require('./passport');


require('./passport')


const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.send(req.isAuthenticated() ? 'Logged In' : 'Logged Out');
  })

app.use('/', require('./routes/paintings'));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/api-documentation'));
app.use('/', require('./routes/auth'));

// app.get('/auth', (req, res) => {
//     res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
// });

// app.use("/", require('./routes/users'));
app.listen(process.env.port || port);
console.log('Web Server is listening at port ' + (process.env.port || port));


