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
    callbackURL: 'https://coder-back-end.herokuapp.com/usuario/facebook/callback',
    // profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)']
}, function(accessToken, refreshToken, profile, done){
    UserF.usuariosFacebook.findOrCreate(profile.id, function(err, user){
        if(err){return done(err);}
        logger.log('info', profile)
        done(null, user);
    })
}))
// async function (token, refreshToken, profile, done) {
//     let valUser = await UserF.usuariosFacebook.findOne({ 'uid': profile.id }).exec()
//     console.log(valUser)
//     if (valUser) {
//         logger.log('info', 'user found')
//         logger.log('info', valUser);
//         return done(null, false)
//     } else {
//         let newUser = new UserF.usuariosFacebook();
//         newUser.uid = profile.id;
//         newUser.token = token;
//         newUser.name = profile.name.givenName + '' + profile.name.familyName;
//         newUser.email = profile.emails[0].value;
//         newUser.gender = profile.gender
//         newUser.pic = profile.photos[0].value
//         await newUser.save();
//         logger.log('info', newUser.uid);
//         logger.log('warning', newUser);
//         return done(null, newUser)
//     }
// }))

