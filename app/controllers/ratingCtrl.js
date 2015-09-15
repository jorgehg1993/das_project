// app/controllers/ratingCtrl.js

// gets the rating model 
var Rating = require('./models/rating.js');

module.exports = function(app) {

    // api route that gets the ratings associated to a
    // creepypasta by its id
    // @param cpId id of the creepypasta
    app.get('/api/rating/:cpId', function(req, res) {
        

    });

    // api route that creates a new rating to a creepypasta
    // @param cpId id of the creepypasta
    app.post('/api/rating/:cpId', function(req, res) {
        

    });

    // api route that modifies a given rating to a creepypasta
    // @param cpId id of the creepypasta
    app.put('/api/rating/:cpId', function(req, res) {
        

    });


    // api route that deletes a given rating to a creepypasta
    // @param cpId id of the creepypasta
    app.delete('/api/rating/:cpId', function(req, res) {
        

    });

};