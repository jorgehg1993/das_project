// app/models/rating.js
// grab the mongoose module
var mongoose = require('mongoose');

// Define of Rating model
var RatingSchema = new mongoose.Schema({
	upvote : {type : Boolean, required: true},
    user_id: {type: mongoose.Schema.ObjectId, required: true},
    cp_id: {type: mongoose.Schema.ObjectId, required: true}
});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Rating', RatingSchema);
