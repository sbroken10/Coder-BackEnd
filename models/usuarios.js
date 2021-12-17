const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const usuarioCollection = 'users';

const usuarioSchema = new Schema({
    user:{type: String, require: true, max:30},
    password:{type: String, require: true},
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