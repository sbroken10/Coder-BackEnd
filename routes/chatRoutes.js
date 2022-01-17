const express = require('express')
const chatRouter = express.Router();
const chMethods = require('../methods/chatMethods.js');
const logger = require('../winston/log-service')
const io = require('socket.io')



chatRouter.get('/', (req, res) => {
    if (req.session.email) {
        let mensaje = new chMethods.mongoDbAtlas(1);
        mensaje.listarTodo().then((data) => res.json(data));
    } else {
        res.send('Modulo exclusivo para Usuarios registrados')
    }

})

chatRouter.post('/', (req, res) => {
    if (req.session.email) {
        let mensaje = new chMethods.mongoDbAtlas(1);
        logger.log('info', 'usuario del mensaje ' + req.session.email )
        let tempUser = req.session.email
        mensaje.agregarMensaje(tempUser, req.body.mensaje)
        
        res.redirect('/api/usuario/home')
    } else {
        res.send('Modulo exclusivo para Usuarios registrados, ingrese su usuario')
    }
})

chatRouter.post('/chat/:email', (req, res) => {
    if (req.session.email) {
        let mensaje = new chMethods.mongoDbAtlas(1);
        if (req.params) {
            mensaje.filtrarUser(req.params.id).then((data) => res.json(data));
        } else {
            res.json('Ingrese el Email');
        }
    } else {
        res.send('Modulo exclusivo para Usuarios registrados, ingrese su usuario')
    }
})

module.exports = chatRouter;
