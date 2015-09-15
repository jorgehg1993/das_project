// app/controllers/creepypastaCtrl.js

// gets the creepypasta model 
var Creepypasta = require('./models/creeepypasta.js');

module.exports = function(app) {

    // api route that retrieves an specific creeypasta 
    // by its id
    // @param cpId id of the creepypasta
    app.get('/api/creepypasta/:cpId', function(req, res) {
        

    });

    // api route that retrieves all creepypastas ordered by date
    app.get('/api/creepypasta/latest', function(req, res) {
        

    });

    // api route that retrieves all creepypastas filtered
    // by search parameters
    // @param key_words string containing all key words to find
    app.get('/api/creepypasta/search/:keywords', function(req, res) {
        

    });

    // api route that retrieves all creepypastas ordered by 
    // number of views, rating and number of comments
    app.get('/api/creepypasta/popular', function(req, res) {
        

    });

    // api route that creates a new creepypasta
    app.post('/api/creepypasta', function(req, res) {
        

    });

    // api route that modifies a creepypasta specified by its id
    // @param cpId id of the creepypasta
    app.put('/api/creepypasta/:cpId', function(req, res) {
        

    });

    // api route that deletes a creepypasta specified by its id
    // @param cpId id of the creepypasta
    app.delete('/api/creepypasta/:cpId', function(req, res) {
        

    });

};