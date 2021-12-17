const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const UserN = require('../models/usuarios')

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    const userD = UserN.usuarios.findById(id);
    done(null, userD)
})

passport.use('singUp', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done) => {
    let valUser = await UserN.usuarios.findOne({ user: user }).exec()
    console.log(valUser)
    if (valUser) {
        done(null, false, req.flash('SingMessage', 'El usuario ya existe'));
    } else {
        const userTemp = new UserN.usuarios();
        userTemp.user = user;
        userTemp.password = userTemp.encryptPassword(password);
        await userTemp.save();
        done(null, userTemp, req.flash('SingMessage', 'Usuario creado correctamente'))
    }
}
))

passport.use('singIn', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, user, password, done) => {
    let valUser = await UserN.usuarios.findOne({ user: user }).exec()
    if (!valUser) {
        done(null, false, req.flash('SingMessage', 'Usuario no encontrado'));
    } else if (!valUser.comparePassword(password)) {
        done(null, false, req.flash('SingMessage', 'Usuario o contraseña incorrectos'))
    } else {
        req.session.user = valUser.user
        done(null, valUser)
    }
}))