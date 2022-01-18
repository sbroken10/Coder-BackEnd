const express = require('express')
const uRouter = express.Router();
const passport = require('passport')
const flash = require('connect-flash');
const { transporterGmail } = require('../nodeMail/confing')
const logger = require('../winston/log-service')
const path = require('path')

// https://github.com/VeraManuel/project-nodejs-mysql-hbs

// https://github.com/VeraManuel/project-nodejs-mysql-hbs/blob/master/src/views/auth/signup.hbs

//Facebook

uRouter.get('/auth/facebook', passport.authenticate('facebook'));

uRouter.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/usuario/profile',
        failureRedirect: '/usuario/home'
    }))


//Forms

uRouter.get('/home', (req, res) => {
    if (req.session.email) {
        req.session.logState = true;
        res.sendFile(path.join(__dirname,'../resources','index.html'))
        // res.render('main', { usuario: req.session.email, status: req.session.logState })
    } else {
        res.sendFile(path.join(__dirname,'../resources','index.html'))
    }
})

//Profile

uRouter.get('/profile', (req, res) => {
    logger.log('info', req.session.email)
    if (req.session.email) {
        res.sendFile(path.join(__dirname,'../resources','indexProductos.html'))
        // req.session.logState = true;
        // logger.log('info', req.session.email)
        // res.render('main', { usuario: req.session.email, status: req.session.logState })
    } else {
        res.sendFile(path.join(__dirname,'../resources','indexProductos.html'))
    }
})

//singUp - Register User

uRouter.get('/singup', (req, res) => {
    if (req.session.email) {
        req.session.logState = true;
        res.sendFile(path.join(__dirname,'../resources','singup.html'))
        // res.render('main', { usuario: req.session.email, status: req.session.logState })
    } else {
        res.sendFile(path.join(__dirname,'../resources','singup.html'))
        // res.render('main', {})
    }
})

uRouter.post('/singup', passport.authenticate('singUp', {
    successRedirect: '/',
    failureRedirect: '/',
    passReqToCallback: true,
}))

//singIn - Login

uRouter.get('/singin', (req, res) => {
    if (req.session.email) {
        req.session.logState = true;
        res.sendFile(path.join(__dirname,'../resources','login.html'))
        // res.render('main', { usuario: req.session.email, status: req.session.logState })
    } else {
        res.sendFile(path.join(__dirname,'../resources','login.html'))
        // res.render('main', {})
    }
})

uRouter.post('/singin', passport.authenticate('singIn', {
    successRedirect: '/',
    failureRedirect: '/',
    passReqToCallback: true,
}))

uRouter.get('/logout', (req, res) => {
    let lastUser = req.session.email
    req.session.destroy();
    req.logout();
    transporterGmail.sendMail({
        from: 'Back End Ecommerce Coderhouse',
        to: 'stivenpedraza_12@hotmail.com',
        subject: 'Usuario Des-Logeado',
        html: `<h1>Usuario des-logeado ${lastUser}</h1>`
    }, (err, info) => {
        if (err) {
            logger.log('err', err);
        } logger.log('info', info);
    })
    res.render('main', { usuario: lastUser, status: false })
})

module.exports = uRouter;
