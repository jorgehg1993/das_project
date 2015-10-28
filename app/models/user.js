// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');

// Define of User model
var UserSchema = new mongoose.Schema({
	username : {type : String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    favorites: [{type: mongoose.Schema.ObjectId, ref: 'Creepypasta'}]
});

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);
