const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const FEusuarioCollection = 'FrontEndUsers';

const usuarioSchema = new Schema({
    email:{type: String},
    password:{type: String},
    nombre:{type: String},
    prefijo:{type: Number},
    telefono:{type: Number},
})
const FeUsuarios = mongoose.model(FEusuarioCollection, usuarioSchema);

module.exports = {
    FeUsuarios
} 