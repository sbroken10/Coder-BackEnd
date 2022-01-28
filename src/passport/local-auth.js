const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const { transporterGmail } = require('../nodeMail/confing')
const logger = require('../winston/log-service')
const UserN = require('../models/usuarios')
const {FeUsuarios} = require('../models/FEUsers')

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser((id, done) => {
    const userD = UserN.usuarios.findById(id);
    done(null, userD)
})

passport.use('singUp', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let valUser = await UserN.usuarios.findOne({ email: email }).exec()
    if (valUser) {
        done(null, false, req.flash('SingMessage', 'El usuario ya existe'));
    } else {
        const { direccion, passwordCheck, nombre, edad, prefijo, telefono, foto } = req.body;
        if(password === passwordCheck){
            const userTemp = new UserN.usuarios();
            userTemp.email = email;
            userTemp.password = userTemp.encryptPassword(password);
            userTemp.direccion = direccion;
            userTemp.nombre = nombre;
            userTemp.edad = edad;
            userTemp.prefijo = prefijo;
            userTemp.telefono = telefono;
            userTemp.foto = foto;
            await userTemp.save();
            transporterGmail.sendMail({
                from: 'Back End Ecommerce Coderhouse',
                to: email,
                subject: 'Nuevo Usuario Registrado',
                html: `<h1>Nuevo Usuario</h1>
                        <ul>
                        <li>Email: ${email}</li>
                        <li>Direccion: ${direccion}</li>
                        <li>Nombre: ${nombre}</li>
                        <li>Edad: ${edad}</li>
                        <li>Telefono: +${prefijo} ${telefono}</li>
                        <li>Foto: ${foto}</li>
                        </ul>`
            }, (err, info) => {
                if (err) {
                    logger.log('err', err);
                } logger.log('info', info);
            })
            done(null, userTemp, req.flash('SingMessage', 'Usuario creado correctamente'))
        }else{
            logger.log('info', 'las contraseñas no coinciden')
            done(null, null, req.flash('SingMessage', 'Las contraseñas no coinciden'))
        }

        
    }
}
))

passport.use('singIn', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let valUser = await UserN.usuarios.findOne({ email: email }).exec()
    if (!valUser) {
        done(null, false, req.flash('SingMessage', 'Usuario no encontrado'));
    } else if (!valUser.comparePassword(password)) {
        done(null, false, req.flash('SingMessage', 'Usuario o contraseña incorrectos'))
    } else {
        req.session.email = valUser.email
        transporterGmail.sendMail({
            from: 'Back End Ecommerce Coderhouse',
            to: 'stivenpedraza_12@hotmail.com',
            subject: 'Usuario Logeado',
            html: `<h1>Usuario loggeado ${req.session.email}</h1>`
        }, (err, info) => {
            if (err) {
                logger.log('err', err);
            } logger.log('info', info);
        })
        done(null, valUser)
    }
}))

passport.use('FEsingIn', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    let valUser = await FeUsuarios.findOne({ email: email }).exec()
    if (!valUser) {
        logger.log('info', 'no se encuentra el usuario')
        done(null, false, req.flash('SingMessage', 'Usuario no encontrado'));
    } else if (valUser.password !== password) {
        logger.log('info', 'la contraseña no coincide')
        done(null, false, req.flash('SingMessage', 'Usuario o contraseña incorrectos'))
    } else {
        logger.log('info', 'entro a la validacion')
        req.session.FrontEndEmail = valUser.email
        transporterGmail.sendMail({
            from: 'Back End Ecommerce Coderhouse',
            to: 'stivenpedraza_12@hotmail.com',
            subject: 'Usuario Logeado',
            html: `<h1>Usuario loggeado ${req.session.FrontEndEmail}</h1>`
        }, (err, info) => {
            if (err) {
                logger.log('err', err);
            } logger.log('info', info);
        })
        done(null, valUser)
    }
}))