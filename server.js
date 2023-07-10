const express = require('express');
const mongodb = require('./db/connect');


const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/', require('./routes/pictures'));


mongodb.initdb((error) => {
    if (error) {
        console.log(error);
    } else {
        
        app.listen(process.env.port || port);
        console.log('Web Server is listening at port ' + (process.env.port || port));
    };
});

