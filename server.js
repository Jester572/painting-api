const express = require('express');
const mongodb = require('./db/connect');


const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});



mongodb.initdb((error) => {
    if (error) {
        console.log(error);
    } else {
        app.use('/', require('./routes/paintings'));

        // app.use("/", require('./routes/users'));
        app.listen(process.env.port || port);
        console.log('Web Server is listening at port ' + (process.env.port || port));
    };
});

