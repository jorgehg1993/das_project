// app/models/creepypasta.js
// grab the mongoose module
var mongoose = require('mongoose');

// Define of Creeypasta model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Creepypasta', {
    title : {type : String},
    content: {type: String},
    photo_url: {type: String},
    number_views: {type: Number},
    creation_date: {type: Date},
    modification_date: {type: Date}
});
