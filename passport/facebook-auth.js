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
    clientID: '237716521803373',
    clientSecret: 'c3e133124aaf0c2a6a1ac0fcd536a04b',
    callbackURL: '/usuario/facebook/callback',
    profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
}, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
        UserF.usuariosFacebook.findOne({ 'uid': profile.id }, function (err, user) {
            if (err) {
                logger.log('error', err)
                return done(err)
            }
            if (user) {
                logger.log('info', 'user found')
                logger.log('info', user);
                return done(null, user)
            } else {
                let newUser = new UserF.usuariosFacebook();
                newUser.uid = profile.id;
                newUser.token = token;
                newUser.name = profile.name.givenName + '' + profile.name.familyName;
                newUser.email = profile.emails[0].value;
                newUser.gender = profile.gender
                newUser.pic = profile.photos[0].value
                newUser.save((err) => {
                    if (err) {
                        logger.log('error', err)
                    }
                    logger.log('info', newUser)
                    return done(null, newUser)
                })

            }
        })
    })
    logger.log('info', profile.id);
    logger.log('warning', profile);
    done(null, profile);
}))

