// app/models/creepypasta.js
// grab the mongoose module
var mongoose = require('mongoose');
var mongoosastic = require('mongoosastic');

// Define of Creeypasta model
var CrepypastaSchema = new mongoose.Schema({
	  title : {type : String, required: true, es_indexed: true},
	  summary: {type: String, required: true},
    content: {type: String, required: true, es_indexed: true},
    photo_url: {type: String},
    number_views: {type: Number, default: 0},
    creation_date: {type: Date, required: true, default: Date.now},
    modification_date: {type: Date},
    rating: {type: Number, default: 0},
    user_id : {type: mongoose.Schema.ObjectId, required: true, ref: 'User'},
    active: {type: Boolean, required: true, default: true, es_indexed: true}
});

CrepypastaSchema.plugin(mongoosastic, {hydrate: true, hydrateOptions: {lean: true, select: '_id title summary number_views rating user_id creation_date'}});

// module.exports allows us to pass this to other files when it is called
var Creepypasta = mongoose.model('Creepypasta', CrepypastaSchema);

Creepypasta.createMapping(function(err, mapping){
  if(err){
    console.log('error creating mapping (you can safely ignore this)');
    console.log(err);
  }else{
    console.log('mapping created!');
    console.log(mapping);
  }
});
/*
var stream = Creepypasta.synchronize();
var count = 0;

stream.on('data', function(err, doc){
  count++;
});
stream.on('close', function(){
  console.log('indexed ' + count + ' documents!');
});
stream.on('error', function(err){
  console.log(err);
});*/


module.exports = Creepypasta;
