// app/controllers/creepypastaCtrl.js

// gets the creepypasta model 
var Creepypasta = require('../models/creepypasta');
var auth = require('../auth.js')

module.exports = function(app) {



    // api route that retrieves all creepypastas ordered by date
    app.get('/api/creepypastas/latest', function(req, res) {
        Creepypasta.find({active: true}, {active: 0, content: 0}).sort({creation_date:'desc'}).lean().exec(function(err, creepypastas) {
            if(err){
                console.log(JSON.stringify(err, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(creepypastas.length == 0){
                return res.status(404).send({success: false, message: 'No creepypastas found'});
            }
            return res.status(200).json({
                success: true,
                message: 'Creepypastas retrieved successfully',
                creepypastas: creepypastas
            });
        });
    });

    // api route that retrieves all creepypastas filtered
    // by search parameters
    // @param key_words string containing all key words to find
    app.get('/api/creepypastas/search/:keywords', function(req, res) {
        if(!req.params.keywords || req.params.keywords.trim() == ''){
            return res.status(400).send({success: false, message: 'No search parameters provided'});
        }
        var search_query = req.params.keywords.split('+').join(' ');

        Creepypasta.search(
            {
                filtered:{
                    query:{
                        query_string:{
                            query: search_query
                        }
                    },
                    filter:{
                        term: {active: true}
                    }
                }
        
            }, 

            function(err, creepypastas){
            if(err){
                console.log(JSON.stringify(err, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(creepypastas.hits.total == 0){
                return res.status(404).send({success: false, message: 'No creepypastas found with search criteria'});
            }
            return res.status(200).json({
                success: true,
                message: 'Creepypastas found with selected criteria',
                creepypastas: creepypastas
            })
        });

    });

    // api route that retrieves all creepypastas ordered by 
    // number of views, rating and number of comments
    app.get('/api/creepypastas/popular', function(req, res) {
        Creepypasta.find({active: true}, {active: 0, content: 0}).sort({rating:'desc'}).lean().exec(function(err, creepypastas) {
            if(err){
                console.log(JSON.stringify(err, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(creepypastas.length == 0){
                return res.status(404).send({success: false, message: 'No creepypastas found'});
            }
            return res.status(200).json({
                success: true,
                message: 'Creepypastas retrieved successfully',
                creepypastas: creepypastas
            });
        });

    });

    // api route that retrieves all creepypastas ordered by 
    // number of views, rating and number of comments
    app.get('/api/mycreepypastas', auth, function(req, res) {
        Creepypasta.find({ $and:[{'active':true}, {'user_id':req.decoded._id}]}, {active: 0, content: 0}).sort({rating:'desc'}).lean().exec(function(err, creepypastas) {
            if(err){
                console.log(JSON.stringify(err, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(creepypastas.length == 0){
                return res.status(404).send({success: false, message: 'No creepypastas found'});
            }
            return res.status(200).json({
                success: true,
                message: 'Creepypastas retrieved successfully',
                creepypastas: creepypastas
            });
        });

    });

    // api route that retrieves an specific creeypasta 
    // by its id
    // @param cpId id of the creepypasta
    app.get('/api/creepypasta/:cpId', function(req, res) {
        Creepypasta.findOne({_id: req.params.cpId}).populate('user_id', 'username').lean().exec(function(err, creepypasta){
            if(err){
                console.log(JSON.stringify(err, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }  

            if(!creepypasta.active)
                return res.status(400).send({success: false, message: 'Creepypasta not available'});

            return res.status(200).json({
                success: true,
                message: 'Creepypasta retrieved successfully',
                creepypasta: creepypasta
            })
        });
    });

    // api route that creates a new creepypasta
    app.post('/api/creepypasta', auth, function(req, res) {
        if(!req.body.title || req.body.title.trim() == '')
            return res.status(400).send({ success: false, message: 'No title provided'});
        if(!req.body.content || req.body.content.trim() == '')
            return res.status(400).send({ success: false, message: 'No content provided'});

        var newCP = Creepypasta();
        newCP.title = req.body.title.trim();
        newCP.content = req.body.content;
        newCP.user_id = req.decoded._id;
        newCP.summary = req.body.content.substring(0, 250);

        newCP.save(function(error, cp_saved){
            if(error)
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});

            return res.status(200).json({
                success: true,
                message: 'Creepypasta created successfully'
            });
        });
    });

    /** 
    *   API PUT route that modifies a creepypasta specified by its id
    *   @param cpId id of the creepypasta
    */
    app.put('/api/creepypasta/:cpId', auth, function(req, res) {
        if(!req.body.title || req.body.title.trim() === '')
            return res.status(400).send({ success: false, message: 'No title provided'});
        if(!req.body.content || req.body.content.trim() === '')
            return res.status(400).send({ success: false, message: 'No content provided'});

        Creepypasta.findById(req.params.cpId, function(err, creepypasta){
            if(err)
                return res.status(500).send({success: false, message: 'An error ocurred, try again later'});
            if(!creepypasta)
                return res.status(404).send({success: false, message: 'Creepypasta not found'});

            if(!creepypasta.active)
                return res.status(400).send({success: false, message: 'Creepypasta not available'});

            if(req.decoded._id != creepypasta.user_id)
                return res.status(401).send({success: false, message: "You don't have permissions to modify this creepypasta"});

            creepypasta.title = req.body.title;
            creepypasta.content = req.body.content;
            creepypasta.modification_date = new Date();
            console.log(JSON.stringify(creepypasta, null, 4));

            creepypasta.save(function(error){
                if(error){
                    console.log(JSON.stringify(error, null, 4));
                    return res.status(500).send({success:false, message: 'An error ocurred. Please try again later'});
                }
                return res.status(200).json({
                    success: true,
                    message: 'Creepypasta updated successfully'
                })
            });
        });
    });

    /** 
    *   API DELETE route that deletes a creepypasta specified by its id
    *   @param cpId id of the creepypasta
    */
    app.delete('/api/creepypasta/:cpId', auth, function(req, res) {

        Creepypasta.findById(req.params.cpId, function(err, creepypasta){
            if(err)
                return res.status(500).send({success: false, message: 'An error ocurred, try again later'});
            if(!creepypasta)
                return res.status(404).send({success: false, message: 'Creepypasta not found'});
            if(!creepypasta.active)
                return res.status(400).send({success: false, message: 'Creepypasta pasta not available'});
            if(req.decoded._id != creepypasta.user_id)
                return res.status(401).send({success: false, message: "You don't have permissions to modify this creepypasta"});

            creepypasta.active = false;

            creepypasta.save(function(error, cp_saved){
                if(error)
                    return res.status(500).send({success:false, message: 'An error ocurred. Please try again later'});

                return res.status(200).json({
                    success: true,
                    message: 'Creepypasta deleted successfully'
                })
            });
        });
    });

};