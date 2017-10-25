var mongoose = require('mongoose');

// new model schema
var ProfileSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    photo: {type: String},
});

// schema variable
var Profile = mongoose.model('profiles', ProfileSchema);

module.exports = Profile;
