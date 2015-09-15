// app/routes.js
module.exports = function(app) {

    // import the routes in controllers
    require('./controllers/commentCtrl')(app); 
    require('./controllers/creepypastaCtrl')(app); 
    require('./controllers/ratingCtrl')(app); 
    require('./controllers/userCtrl')(app); 

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

};
