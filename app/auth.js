var jwt = require('jsonwebtoken');
var secret_key = require('../config/secret');

module.exports = function (req, res, next) {
    var token = req.headers['x-access-token'];

	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, secret_key.secret, function(err, decoded) {			
			if (err) {
				if(err.name === 'TokenExpiredError')
					return res.status(498).send({ success: false, message: 'Token no loger valid'});
				else
					return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});	
	}
}