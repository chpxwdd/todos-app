const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const config = require('config')
const opts = {}

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.get('jwtPhrase')



module.exports = passport => {
  const modelCoreUser = mongoose.model('CoreUser')
  console.log("Init passport")

  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      console.log(jwt_payload)
      modelCoreUser
        .findById(jwt_payload.id)
        .then(user => {
          console.log(user)
          return done(null, user ? user : false)
        })
        .catch(err => console.error(err))
    })
  )
}
