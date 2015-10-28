// app/controllers/ratingCtrl.js

// gets the rating model 
var Rating = require('../models/rating');
var Creepypasta = require('../models/creepypasta');
var auth = require('../auth.js')

module.exports = function(app) {

    // API route that gets the ratings made by a user
    app.get('/api/rating', auth, function(req, res) {
        Rating.find({user_id: decoded._id}, function(err, ratings){
            if(err){
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(ratings.length == 0){
                return res.status(404).send({success: false, message: 'No ratings found'});
            }

            return res.status(200).json({
                success: true,
                message: 'Ratings retrieved successfully',
                ratings: ratings
            });
        });
    });

    // api route that creates a new rating to a creepypasta
    // @param cpId id of the creepypasta
    app.post('/api/rating/:cp_id', auth, function(req, res) {
        if(req.body.upvote == null){
            return res.status(400).send({success: false, message: 'No value for rating provided'});
        }

        Creepypasta.findById(req.params.cp_id, function(err_cp, creepypasta){
            if(err_cp){
                console.log(JSON.stringify(err_cp, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(!creepypasta){
                return res.status(404).send({success: false, message: 'Creepypasta not found'});
            }
            if(!creepypasta.active){
                return res.status(400).send({success: false, message: 'Creepypasta not available'});
            }


            Rating.find({$and: [{user_id: req.decoded._id}, {cp_id: req.params.cp_id}]}, function(err_rating, rating){
                if(err_rating){
                    console.log(JSON.stringify(err_rating, null, 4));
                    return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                }

                if(rating.length > 0){
                    return res.status(400).send({success: false, message: 'Pasta already rated'});
                }else{
                    var newRating = new Rating();
                    newRating.upvote = req.body.upvote;
                    newRating.user_id = req.decoded._id;
                    newRating.cp_id = req.params.cp_id;
                    newRating.save(function(err_save){
                        if(err_save){
                            console.log(JSON.stringify(err_save, null, 4));
                            return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                        }

                        if(req.body.upvote == true){
                            creepypasta.rating = creepypasta.rating + 1;
                            console.log('Evaluation given == true');
                        }else{
                            creepypasta.rating = creepypasta.rating - 1;
                            console.log('Evaluation given == false');
                        }

                        creepypasta.save(function(err_cp_save){
                            if(err_cp_save){
                                console.log(JSON.stringify(err_cp_save, null, 4));
                                return res.status(500).send({success: false, message:'An error ocurred. Please try again later'});
                            }

                            return res.status(200).json({
                                success: true,
                                message: 'Rating processed successfully',
                            });
                        });
                    });
                }
            });
        });
    });

    // api route that modifies a given rating to a creepypasta
    // @param cpId id of the creepypasta
    app.put('/api/rating/:cp_id', auth, function(req, res) {
        if(req.body.upvote == null){
            return res.status(400).send({success: false, message: 'No value for rating provided'});
        }
        Creepypasta.findById(req.params.cp_id, function(err_cp, creepypasta){

            if(err_cp){
                console.log(JSON.stringify(err_cp, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(!creepypasta){
                return res.status(404).send({success: false, message: 'Creepypasta not found'});
            }
            if(!creepypasta.active){
                return res.status(400).send({success: false, message: 'Creepypasta not available'});
            }

            Rating.findOne({$and: [{user_id: req.decoded._id}, {cp_id: req.params.cp_id}]}, function(err, rating){
                if(err){
                    return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                }
                if(!rating){
                    return res.status(404).send({success: false, message: 'No rating to update'})
                }

                if(rating.upvote == body_upvote){
                    return res.status(400).send({success: false, message: "Rating didn't change"});
                }

                rating.upvote = req.body.upvote;
                rating.save(function(err){
                    if(err){
                        return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                    }

                    if(req.body.upvote == true){
                        creepypasta.rating = creepypasta.rating + 1;
                    }else{
                        creepypasta.rating = creepypasta.rating - 1;
                    }

                    creepypasta.save(function(err_cp_save){
                        if(err_cp_save){
                            console.log(JSON.stringify(err_cp_save, null, 4));
                            return res.status(500).send({success: false, message:'An error ocurred. Please try again later'});
                        }
                        return res.status(200).json({
                            success: true,
                            message: 'Rating updated successfully'
                        });
                    });
                });
            }); 
        });
    });

    // api route that modifies a given rating to a creepypasta
    // @param cpId id of the creepypasta
    app.delete('/api/rating/:cp_id', auth, function(req, res) {
        Rating.remove({$and: [{user_id: req.decoded._id}, {cp_id: req.params.cp_id}]}, function(err){
            if(err){
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            res.status(200).json({
                success: true,
                message: 'Rating deleted successfully'
            });
        });
    });

};