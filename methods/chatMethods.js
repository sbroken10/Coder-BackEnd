const mongoose = require('mongoose');
const model = require('../models/mensajes');
const logger = require('../winston/log-service')
const {sms} = require('../twilio/config')


class mongoDbAtlas {

    constructor(id){
        this.id = id
    }

    async listarTodo() {
        let mensajesList = await model.mensajes.find({})
        logger.log('info', 'se cargaron los mensajes')
        return mensajesList
    }
    async agregarMensaje( user, msj) {
        let messageArr = msj.split(" ")
        logger.log('info', messageArr);
        const trigger = messageArr.find(word => word === 'admin')
        logger.log('info', trigger);
        if(trigger){
            sms.messages.create({
                body: msj,
                from: '+12674406874',
                to: '+573203792289'
            })

            await new model.mensajes({ user: user, mensaje: msj}).save().then(logger.log('info', 'agregado con palabra admin'))
        }else{
            await new model.mensajes({ user: user, mensaje: msj}).save().then(logger.log('info', 'agregado'))
        }
        
    }

    async filtrarUser(user) {
        let MensajesFilter = await model.mensajes.find({ user: user })
        return MensajesFilter
    }
}

module.exports = {mongoDbAtlas};
