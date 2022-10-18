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
const Chart = require('chart.js')
const getAllUsers = require('./middlewares/getallusers')
const userRoutes = require('./routes/users');
const indexRoutes = require('./routes/index');
const request = require('request')

const PORT = 3000;
const CONNECTION_STRING = "postgres://localhost:5432/atsdemodb";


// create call_api function

function call_api() {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_bec7f490df724db984b38b543237b37a', { json: true }, (err, res, body) => {
    if(err) {return console.log(err)}
    if (res.statusCode === 200) {
        return body
    }
})
}

/* API Key for IEX site: pk_bec7f490df724db984b38b543237b37a
request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_bec7f490df724db984b38b543237b37a', { json: true }, (err, res, body) => {
    if(err) {return console.log(err)}
    if (res.statusCode === 200) {
        console.log(body)
    }
})
*/

const VIEWS_PATH = path.join(__dirname,'/views');

app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'));
app.set('views',VIEWS_PATH);
app.set('view engine','mustache');
app.use('/css',express.static('css'));
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
app.use('/users',checkAuthorization,userRoutes);
app.use('/users',getAllUsers,userRoutes);

app.listen(PORT,() => {
    console.log(`Server has started on ${PORT}`)
});