const express = require('express');
const favicon = require('serve-favicon');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const session = require('express-session');
const path = require('path');
app.use(favicon(path.join(__dirname, 'favicon.ico')));
const checkAuthorization = require('./middlewares/authorization');
const getAllUsers = require('./middlewares/getallusers')
const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');
// const { Magic } = require('magic-sdk');
// const magic = new Magic('pk_live_09EF4F8C09120D83');

const PORT = 3000;
const CONNECTION_STRING = "postgres://localhost:5432/atsdemodb";


// create call_api function

async function call_api() {
    try {
        const res = await fetch('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_bec7f490df724db984b38b543237b37a');
        if (res.ok) return await res.json();
    } catch (err) {
        console.log(err);
    }
}

const VIEWS_PATH = path.join(__dirname,'/views');

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
app.set('views',VIEWS_PATH);
app.set('view engine','mustache');
app.use('/css',express.static('css'));
app.use('/images', express.static('images'));
app.use('/scripts',express.static('scripts'));

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
app.use('/users',checkAuthorization,getAllUsers,userRoutes);

app.listen(PORT,() => {
    console.log(`Server has started on ${PORT}`)
});