var mongoose = require('mongoose');

// avoid mongoose library warning
mongoose.Promise = global.Promise;
// connect to database
mongoose.connect('mongodb://localhost/profiles');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log("Profiles db is connected");
});
