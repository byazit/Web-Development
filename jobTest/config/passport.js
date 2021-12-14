const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models').User;

module.exports = function(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: 'IOZdZshjK1MBEIktCU3ciNiizXTsz7x33CtsaYuQnpR7n7Zhw8RLlsqYVUuv4ZRUgXKHWS9uoBxHdcADPgjjK.LsxYKdCjl5rCrYPMgzQl7Nn0Q8rq.RnZtjhnm4VguPFGiub2rqNwYK7HiRVyhti7ZPV0Tfi4qkqHG5eTsFvOQGIkJXSXYv8JyIc2TOaFZz.qm9Oh.qHU916wPsmmXkHynvUqJWDGP5GHG.gjUjX5IKcoscRlq0KJJr0YOb8JpOEORFB070x',
  };
  passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    User
      .findByPk(jwt_payload.id)
      .then((user) => { return done(null, user); })
      .catch((error) => { return done(error, false); });
  }));
};