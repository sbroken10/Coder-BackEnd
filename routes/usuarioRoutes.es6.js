const express = require('express')
const uRouter = express.Router();
const passport = require('passport')
const flash = require('connect-flash');
const { transporterGmail } = require('../nodeMail/confing')
const logger = require('../winston/log-service')
const path = require('path')


//Forms

uRouter.get('/home', (req, res) => {
    if (req.session.email) {
        req.session.logState = true;
        res.sendFile(path.join(__dirname,'../resources','index.html'))
    } else {
        res.sendFile(path.join(__dirname,'../resources','index.html'))
    }
})

//Profile

uRouter.get('/profile', (req, res) => {
    logger.log('info', req.session.email)
    if (req.session.email) {
        res.sendFile(path.join(__dirname,'../resources','indexProductos.html'))
    } else {
        res.sendFile(path.join(__dirname,'../resources','indexProductos.html'))
    }
})

//singUp - Register User

uRouter.get('/singup', (req, res) => {
    if (req.session.email) {
        req.session.logState = true;
        res.sendFile(path.join(__dirname,'../resources','singup.html'))
    } else {
        res.sendFile(path.join(__dirname,'../resources','singup.html'))
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
        res.sendFile(path.join(__dirname,'../resources','logIn.html'))
    } else {
        res.sendFile(path.join(__dirname,'../resources','logIn.html'))
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
    res.redirect('/')
})

module.exports = uRouter;
