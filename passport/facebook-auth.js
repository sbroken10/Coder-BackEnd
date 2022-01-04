const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const logger = require('../winston/log-service')

const UserN = require('../models/usuarios')

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    const userD = UserN.usuarios.findById(id);
    done(null, userD)
})

passport.use('facebook', new facebookStrategy({
    clientID:'237716521803373',
    clientSecret: 'c3e133124aaf0c2a6a1ac0fcd536a04b',
    callbackURL : '/usuario/home',
}, function (token, refreshToken, profile, done){
    logger.log('info', profile);
    done(null, profile)
}))

