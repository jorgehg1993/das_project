// app/controllers/userCtrl.js

// gets the user model 
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret_key = require('../../config/secret');
var auth = require('../auth.js');
var Creepypasta = require('../models/creepypasta');

module.exports = function(app) {

    /*** 
    *   API route that creates a new access token for a registered user
    * 
    *   @param  username or email stored in request body
    *   @param  password stored in request body
    *   @return access token
    */
    app.post('/api/login', function(req, res) {

        User.findOne({ $or:[{'email':req.body.username}, {'username':req.body.username}]}, function(error, user) {

            if (error) {
                return res.status(500).send({ success: false, message: 'An error ocurred, please try again later' });
            }

            if (!user) {
                return res.status(401).send({ success: false, message: 'Invalid credentials. User not found.' });
            } 
            
            console.log(user);
            // check if password matches
            bcrypt.compare(req.body.password, user.password, function (err, valid) {
                if (err) { 
                    console.log(err);
                    return res.status(500).send({ success: false, message: 'An error ocurred. Try again later' });
                }

                if (!valid) { 
                    return res.status(401).send({ success: false, message: 'Invalid credentials'}); 
                }

                var coded_user = new User();
                coded_user._id = user._id;
                coded_user.username = user.username;

                // if user is found and password is right, create a token
                var token = jwt.sign(coded_user, secret_key.secret, { expiresIn: "7d" });

                return res.status(200).json({
                    success: true,
                    message: 'Login succesful.',
                    token: token
                });   
            });      
        });
    });

    /** 
    *   API route that creates a new user and returns an access token to user
    *
    *   @param  username stored in request body
    *   @param  email stored in request body
    *   @param  password stored in request body
    *   @return access token 
    */
    app.post('/api/register', function(req, res) {

        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).send({ success: false, message: "Missing fields - null" });
        }

        if (req.body.username.trim() == '' || req.body.password.trim() == '' || req.body.email.trim() == '') {
            return res.status(400).send({ success:false, message: "Missing fields - empty" });
        }

        if (req.body.username.length < 6) {
            return res.status(400).send({ success: false, message: "Username must be at least 6 characters long" });
        }

        if (req.body.password.length < 8) {
            return res.status(400).send({ success: false, message: "Password must be at least 8 characters" });
        }

        User.findOne({ $or:[{'email':req.body.email}, {'username':req.body.username}]}, function(error, user_found){
            if(error){
                return res.status(500).send({ success: false, message: 'An error ocurred, please try again later' });
            }

            if(user_found){
                if(user_found.email == req.body.email){
                    return res.status(400).send({ success: false, message: 'User already exists with that email' });
                } else if(user_found.username == req.body.username){
                    return res.status(400).send({ success: false, message: 'Username already exists, choose another one' });
                }
            }

            var newUser = new User();
            newUser.username = req.body.username;
            newUser.email = req.body.email;
            newUser.favorites = [];

            bcrypt.hash(req.body.password, 10, function(err, hash){

                if(err){
                    return res.status(500).send({ success: false, message: 'An error ocurred, please try again later.' });
                }

                newUser.password = hash;

                newUser.save(function(err, user){

                    if(err){
                        return res.status(500).send({ success: false, message: 'An error ocurred, please try again later.' });
                    }

                    var coded_user = new User();
                    coded_user._id = user._id;
                    coded_user.username = user.username;

                    var token = jwt.sign(coded_user, secret_key.secret, { expiresIn: "7d" });

                    return res.status(200).json({
                        success: true,
                        message: 'Registration succesful.',
                        token: token
                    });
                });
            });
        });        
    });

    /** 
    *   API route that gets information of an specific user
    *   @param token stored in request header
    */
    app.get('/api/user', auth, function(req, res) {
        User.findById(req.decoded._id, {password: 0}, function(err, user){
            if(err){
                return res.status(400).send({ 
                    success: false, 
                    message: err
                });
            }
            
            if(!user){
                return res.status(404).send({ 
                    success: false, 
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                profile: user
            });
        });
    });

    /** 
    *   API route that updates information of an specific user
    *   @param token stored in request header
    */
    app.put('/api/user/changepassword', auth, function(req, res) {
        if(!req.body.old_password || req.body.old_password.trim() == '')
            return res.status(400).send({ success:false, message: 'No old password provided' });

        if(!req.body.new_password || req.body.new_password.trim() == '')
            return res.status(400).send({ success:false, message: 'No new password provided' });

        if(req.body.new_password == req.body.old_password)
            return res.status(400).send({ success:false, message: 'New password is the same as the old one' });

        if(req.body.new_password.length < 8)
            return res.status(400).send({ success: false, message: 'New password is too short'});

        User.findById(req.decoded._id, function(err, user){
            if(err)
                return res.status(500).send('An error ocurred. Please try again later.');

            if(!user)
                return res.status(404).send({ success: false, message: 'User not found'});
            
            bcrypt.compare(req.body.old_password, user.password, function (err, valid) {
                if (err) { 
                    console.log(err);
                    return res.status(500).send({ success: false, message: 'An error ocurred. Try again later' });
                }

                if (!valid) 
                    return res.status(400).send({success: false, message: "Old password doesn't match"});

                bcrypt.hash(req.body.new_password, 10, function(err, hash){

                    if(err){
                        return res.status(500).send({ success: false, message: 'An error ocurred, please try again later.' });
                    }

                    user.password = hash;

                    user.save(function(err){
                        
                        if (err){
                            console.log(JSON.stringify(err, null, 4));
                            return res.status(400).send({ 
                                success: false, 
                                message: 'Username or email already exist.'
                            });
                        }
                        var coded_user = new User();
                        coded_user._id = user._id;
                        coded_user.username = user.username;
                        var token = jwt.sign(coded_user, secret_key.secret, { expiresIn: "7d" });

                        res.status(200).json({
                            success: true,
                            message: 'Password update succesful, enjoy your new token',
                            token: token
                        });
                    });
                });
            });
        });
    });


    app.get('/api/favorites', auth, function(req, res) {
        User.findOne({_id: req.decoded._id}).
        populate({
            path: 'favorites',
            match: { active: true},
            select: '-content'})
        .lean().exec(function(err, user){
            if(err){
                console.log(JSON.stringify(err, null, 4));
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }  

            if(!user)
                return res.status(404).send({success: false, message: 'No user found'});

            if(user.favorites.length == 0)
                return res.status(404).send({success: false, message: 'No favorites found'});

            return res.status(200).json({
                success: true,
                message: 'Favorites retrieved succesfully',
                favorites: user.favorites
            })
        });
    });

    /** 
    *   API route that saves a creepypasta into user's favorites
    *   @param cpId creepypasta id
    *   @param token stored in request header
    */
    app.post('/api/favorite/:cp_id', auth, function(req, res) {
        Creepypasta.findById(req.params.cp_id, function(error, creepypasta){
            if(error){
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(!creepypasta){
                return res.status(404).send({success: false, message: 'Creepypasta not found'});
            }
            if(!creepypasta.active){
                return res.status(400).send({success: false, message: 'Creepypasta not available to modify'});
            }

            User.findById(req.decoded._id, function(err, user){
                if(err){
                    return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                }
                if(!user){
                    return res.status(404).send({success: false, message: 'User not found'});
                }
                for(i=0; i<user.favorites.length; i++){
                    if(user.favorites[i] == req.params.cp_id){
                        return res.status(400).send({success: false, message: 'Creepypasta already added to favorites'});
                    }
                }
                user.favorites.push(req.params.cp_id);

                user.save(function(error_save){
                    if(error_save){
                        return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Creepypasta added to favorites'
                    })
                });
            });
        });
    });

    /** 
    *   API route that deletes a creepypasta into user's favorites
    *   @param cpId creepypasta id
    *   @param token stored in request header
    */
    app.delete('/api/favorite/:cp_id', auth, function(req, res) {
        var deleted = false;
        User.findById(req.decoded._id, function(err, user){
            if(err){
                return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
            }
            if(!user){
                return res.status(404).send({success: false, message: 'User not found'});
            }
            for(i=0; i<user.favorites.length; i++){
                if(user.favorites[i] == req.params.cp_id){
                    user.favorites.splice(i, 1);
                    deleted = true;
                }
            }

            if(deleted){
                user.save(function(error_save){
                    if(error_save){
                        return res.status(500).send({success: false, message: 'An error ocurred. Please try again later'});
                    }
                    return res.status(200).json({
                        success: true,
                        message: 'Creepypasta deleted from favorites'
                    })
                });
            }else{
                return res.status(400).send({success: false, message: 'Creepypasta not found in user favorites'});
            }
        });
    });

};
