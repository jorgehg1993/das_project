// app/models/rating.js
// grab the mongoose module
var mongoose = require('mongoose');

// Define of Rating model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Rating', {
    value : {type : Number},
    userID: {type: String},
    cpID: {type: String}
});
