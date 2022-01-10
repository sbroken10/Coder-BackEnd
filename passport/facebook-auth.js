const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const logger = require('../winston/log-service')
const UserF = require('../models/facebook')


passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    const userD = UserF.usuariosFacebook.findById(id);
    done(null, userD)
})

passport.use('facebook', new facebookStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: 'https://coder-back-end.herokuapp.com/usuario/facebook/callback',
    
}, function(accessToken, refreshToken, profile, done){
    UserF.usuariosFacebook.findOrCreate(profile.id, function(err, user){
        if(err){return done(err);}
        logger.log('info', profile)
        done(null, user);
    })
}))


