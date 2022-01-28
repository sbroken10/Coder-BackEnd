const mongoose = require('mongoose');
const {Schema} = mongoose;

const usuarioCollection = 'mensajes';

const usuarioSchema = new Schema({
    user:{type: String},
    mensaje:{type: String},
    fecha: {type: String}
})

const mensajes = mongoose.model(usuarioCollection, usuarioSchema);

module.exports = {
    mensajes
} 