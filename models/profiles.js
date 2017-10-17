var mongoose = require('mongoose');

//new schema
var ProfileSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    photo: {type: String},    
});

//new model
var Profile = mongoose.model('profiles', ProfileSchema);

module.exports = Profile;
