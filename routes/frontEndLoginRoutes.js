const express = require('express')
const jwt = require('jsonwebtoken')
const frontEndRouter = express.Router();
const logger = require('../winston/log-service.js');
const passport = require('passport')
const {verifyToken} = require('../middlewares/verifyToken')

frontEndRouter.get('/login', (req, res) =>{
    res.render('loginApi' , {})
})

frontEndRouter.post('/login', passport.authenticate('FEsingIn', {
    successRedirect: '/api/success',
    failureRedirect: '/usuario/home',
    passReqToCallback: true,
}))

frontEndRouter.get('/success', (req, res) =>{
    jwt.sign({user: req.session.FrontEndEmail}, 'steven10', (err, token) =>{
        if(err){
            res.status(403)
        }else{
            res.json(token)
        }
    })
})

frontEndRouter.get('/test', verifyToken, (req, res) =>{
    jwt.verify(req.session.token, 'steven10', (err, authData) => {
        if(err){
            res.send('forbiden')
        }else{
            res.json({
                mensaje:'echo', 
                authData: authData
            })
        }
    })
})


module.exports = frontEndRouter
