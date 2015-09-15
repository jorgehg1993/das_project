// app/models/comment.js
// grab the mongoose module
var mongoose = require('mongoose');

// Define of Comment model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Comment', {
    title : {type : String},
    text: {type: String},
    date: {type: Date},
    userID: {type: String},
    cpID: {type: String}

});
