// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');

// Define of User model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
    username : {type : String},
    email: {type: String},
    password: {type: String},
    favorites: [String]
});
