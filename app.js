const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const session = require('express-session');
const path = require('path');
// const checkAuthorization = required('./utils/authorization');

const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');

const PORT = 3000;
const CONNECTION_STRING = "postgres://localhost:5432/atsdemodb";

const VIEWS_PATH = path.join(__dirname,'/views');

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
app.set('views',VIEWS_PATH);
app.set('view engine','mustache');
app.use('/css',express.static('css'));

app.use(session({
    secret: 'lgbtqwerty',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000, // 1 hour
        // secure: true, // Uncomment this line to enforce HTTPS protocol.
        sameSite: true
    }
}));

app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
    res.locals.authenticated = req.session.user == null ? false : true
    next()
});

// if the "const" is removed, db becomes available to users.js
db = pgp(CONNECTION_STRING);

// set up a middleware for routes
app.use('/',indexRoutes);
// app.use('/users',checkAuthorization,userRoutes);

app.listen(PORT,() => {
    console.log(`Server has started on ${PORT}`)
});