// set up ========================
    var express = require('express');
    var app = express(); // create our app w/ express
    var mongoose = require('mongoose'); // mongoose for mongodb
    var morgan = require('morgan'); // log requests to the console (express4)
    var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var exphbs = require('express-handlebars'); // template engine
    var multer = require('multer'); // file upload
    var favicon = require('serve-favicon'); // favicon
    var path = require('path');

// database connect =================
require('./config/database');

// configuration =================

    app.use(morgan('dev')); // log every request to the console
    app.use(methodOverride('_method')); // put and delete
    app.use(bodyParser.json()); // parse application/json
    app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
    app.engine('handlebars', exphbs({defaultLayout: 'main'})); // template engine base file
    app.set('view engine', 'handlebars'); // template engine
    app.use(express.static(__dirname + '/public')); //static assets
    app.use(favicon(path.join(__dirname,'public','images','favicon.jpg')));


// routes =========================

require('./routes/api')(app);

// port ======================================================================
var port = "3000";
app.listen(port);
console.log("Magic happens at " + port);
