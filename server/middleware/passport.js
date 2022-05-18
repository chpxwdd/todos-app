const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const config = require("config");
const opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.get("jwtPhrase");

module.exports = (passport) => {
  const modelCoreUser = mongoose.model("CoreUser");
  console.log("pasport 1");
  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      console.log("pasport 2", jwt_payload.id);
      modelCoreUser
        .findById(jwt_payload.id)
        .exec()
        .then((user) => {
          return done(null, user ? user : false);
        })
        .catch((err) => console.error(err));
    })
  );
};
