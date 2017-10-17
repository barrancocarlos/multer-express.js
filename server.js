// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var exphbs  = require('express-handlebars');     //handlebars
    var multer  = require('multer');              //multer
    


// Db connect =================
require('./config/database');

// configuration =================

    app.use(morgan('dev'));                                         // log every request to the console
    //app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(methodOverride('_method'));               // put and delete
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

     app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');                                 // template engine
    app.use(express.static(__dirname + '/public'));


// routes =========================

require('./routes/api')(app);

// Port ======================================================================
var port = "3000";
app.listen(port);
console.log("Magic happens at " + port);
