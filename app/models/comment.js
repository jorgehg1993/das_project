// app/models/comment.js
// grab the mongoose module
var mongoose = require('mongoose');

// Define of Comment model
var CommentSchema = new mongoose.Schema({
    text: {type: String, required: true},
    date: {type: Date, required: true, default: Date.now},
    user_id: {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
    cp_id: {type: mongoose.Schema.ObjectId, required: true},
    active: {type: Boolean, required: true, default: true}
});
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Comment', CommentSchema);
