// app/controllers/commentCtrl.js

// gets the comment model 
var Comment = require('../models/comment');
var Creepypasta = require('../models/creepypasta');
var auth = require('../auth.js');

module.exports = function(app) {

    /** 
    *   API route that retrieves all comments stored in database
    *   associated to a creeepypasta
    *   @param cpId id of the creepypasta
    */
    app.get('/api/comments/:cp_id', function(req, res) {
        Comment.find({cp_id: req.params.cp_id}).sort({date:'desc'}).populate('user_id', 'username').lean().exec(function(err, comments_found){
            if(err){
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(comments_found.length == 0){
                return res.status(404).send({success: false, message: 'No comments found'});
            }
            return res.status(200).json({
                success: true,
                message: 'Comments retrieved successfully',
                comments: comments_found
            });
        });
    });

    /** 
    *   API route that creates a new comment and associates it
    *   to a creepypasta by its id
    *   @param cpId id of the creepypasta
    */
    app.post('/api/comments/:cpId', auth, function(req, res) {
        
        if(!req.body.text || req.body.text.trim() == ''){
            return res.status(400).send({success: false, message: 'No text provided for the comment'});
        }

        Creepypasta.findById(req.params.cpId, function(err, creepypasta){
            if(err){
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(!creepypasta){
                return res.status(404).send({success: false, message: 'No creepypasta found to comment'});
            }
            if(!creepypasta.active){
                return res.status(400).send({success: false, message: 'No creepypasta available to comment'});
            }

            var comment = new Comment();
            comment.text = req.body.text;
            comment.cp_id = req.params.cpId;
            comment.user_id = req.decoded._id;

            comment.save(function(error){
                if(error){
                    return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                }
                return res.status(200).json({
                    success: true,
                    message: 'Comment created successfully'
                });
            });
        });

    });

    /**
    *   API route that modifies a comment 
    *   @param cpId id of the creepypasta
    */
    app.put('/api/comments/:comment_id', auth, function(req, res) {
        if(!req.body.text || req.body.text.trim() == ''){
            return res.status(400).send({success: false, message: 'No text provided for the comment'});
        }

        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                return res.status(500).send({success: false, message: 'An error ocurred.Please try again later'});
            }
            if(!comment){
                return res.status(404).send({success: false, message: 'No comment found'});
            }
            if(!comment.active){
                return res.status(400).send({success: false, message: 'No comment available to edit'});
            }
            if(comment.user_id != req.decoded._id){
                return res.status(401).send({success: false, message: "You don't have permissions to modify this comment"});
            }

            comment.text = req.body.text;
            comment.save(function(error){
                if(error){
                    return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                }
                return res.status(200).json({
                    success: true,
                    message: 'Message updated successfully',
                    comment: comment
                })
            });
        });
    });


    /** 
    *   API route that deletes a comment from database
    *   associated to a creepypasta
    *   @param cpId id of the creepypasta
    */
    app.delete('/api/comments/:comment_id', auth, function(req, res) {
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later.'});
            }
            if(!comment){
                return res.status(404).send({success: false, message: 'No comment found to delete'});
            }
            if(!comment.active){
                return res.status(400).send({success: false, message: 'No comment available to delete'});
            }
            if(comment.user_id != req.decoded._id){
                return res.status(401).send({success: false, message: "You don't have permissions to modify this comment"});
            }
            comment.active = false;
            comment.save(function(error){
                if(error){
                    return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                }
                return res.status(200).json({
                    success: true,
                    message: 'Comment deleted successfully'
                });
            });
        });
    });

};