const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const usuarioCollection = 'users';

const usuarioSchema = new Schema({
    email:{type: String},
    password:{type: String},
    direccion:{type: String},
    nombre:{type: String},
    edad:{type: Number},
    prefijo:{type: Number},
    telefono:{type: Number},
    foto:{type: String},
})
usuarioSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

usuarioSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password) 
}

const usuarios = mongoose.model(usuarioCollection, usuarioSchema);

module.exports = {
    usuarios
} 