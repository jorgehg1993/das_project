// app/routes.js
module.exports = function(app) {

    // import the routes in controllers
    require('./controllers/commentCtrl')(app); 
    require('./controllers/creepypastaCtrl')(app); 
    require('./controllers/ratingCtrl')(app); 
    require('./controllers/userCtrl')(app); 

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
