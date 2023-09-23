const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const mongoose = require('./config/mongoose');
const passport = require('passport');
const passportJwt = require('./config/passport-jwt-auth');

// middleware used to decode the encrypted data with the help of bodyparser 
app.use(bodyParser.urlencoded({extended: false}));

// initialize passport in our express app. 
app.use(passport.initialize());


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
