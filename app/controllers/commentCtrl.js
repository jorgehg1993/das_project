// app/controllers/commentCtrl.js

// gets the comment model 
var Comment = require('./models/comment.js');

module.exports = function(app) {

    // api route that retrieves all comments stored in database
    // associated to a creeepypasta
    // @param cpId id of the creepypasta
    app.get('/api/comments/:cpId', function(req, res) {
        

    });

    // api route that creates a new comment and associates it
    // to a creepypasta by its id
    // @param cpId id of the creepypasta
    app.post('/api/comments/:cpId', function(req, res) {
        

    });

    // api route that modifies a comment asscociated
    // to a creepypasta
    // @param cpId id of the creepypasta
    app.put('/api/comments/:cpId', function(req, res) {
        

    });


    // api route that deletes a comment from database
    // associated to a creepypasta
    // @param cpId id of the creepypasta
    app.delete('/api/comments/:cpId', function(req, res) {
        

    });

};