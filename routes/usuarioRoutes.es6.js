const express = require('express')
const uRouter = express.Router();
const passport = require('passport')
const flash = require('connect-flash');

// https://github.com/VeraManuel/project-nodejs-mysql-hbs

// https://github.com/VeraManuel/project-nodejs-mysql-hbs/blob/master/src/views/auth/signup.hbs

//Facebook

uRouter.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

uRouter.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/usuario/profile',
        failureRedirect: '/usuario/home'
    }))


//Forms

uRouter.get('/home', (req, res) => {
    if (req.session.user) {
        req.session.logState = true;
        res.render('main', { usuario: req.session.user, status: req.session.logState })
    } else {
        res.render('main', {})
    }
})

//Profile

uRouter.get('/profile', (req, res) => {
    if (req.session.user) {
        req.session.logState = true;
        res.render('main', { usuario: req.session.user, status: req.session.logState })
    } else {
        res.render('main', {})
    }
})

//singUp - Register User

uRouter.post('/singup', passport.authenticate('singUp', {
    successRedirect: '/usuario/home',
    failureRedirect: '/usuario/home',
    passReqToCallback: true,
}))

//singIn - Login

uRouter.get('/singin', (req, res) => {
    if (req.session.user) {
        req.session.logState = true;
        res.render('main', { usuario: req.session.user, status: req.session.logState })
    } else {
        res.render('main', {})
    }
})

uRouter.post('/singin', passport.authenticate('singIn', {
    successRedirect: '/usuario/profile',
    failureRedirect: '/usuario/home',
    passReqToCallback: true,
}))

uRouter.get('/logout', (req, res) => {
    let lastUser = req.session.user
    req.session.destroy();
    req.logout();
    res.render('main', { usuario: lastUser, status: false })
})

module.exports = uRouter;
