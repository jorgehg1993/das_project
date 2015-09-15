// app/controllers/userCtrl.js

// gets the user model 
var User = require('./models/user.js');

module.exports = function(app) {

    // api route that creates a new access token 
    // for a registered user
    // @param username or email stored in request body
    // @param password stored in request body
    app.post('/api/login', function(req, res) {
        

    });

    // api route that invalidates access token
    // @param token stored in request header
    app.post('/api/logout', function(req, res) {
        

    });

    // api route that saves a creepypasta into user's favorites
    // @param1 cpId creepypasta id
    // @param2 token stored in request header
    app.post('/api/user/favorite/:cpId', function(req, res) {
        

    });

    // api route that creates a new account and returns 
    // an access token to user
    // @param1 username stored in request header
    // @param2 email stored in request header
    // @param3 password stored in request header
    app.post('/api/user/register', function(req, res) {
        

    });

    // api route that gets information of an specific user
    // @param token stored in request header
    app.get('/api/user', function(req, res) {
        

    });

    // api route that updates information of an specific user
    // @param token stored in request header
    app.put('/api/user', function(req, res) {
        

    });


    // api route that deletes an user account 
    // @param token stored in request header
    app.delete('/api/user', function(req, res) {
        

    });

};