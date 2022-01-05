const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const {Schema} = mongoose;

const usuarioCollection = 'socialMedia';

const usuarioSchema = new Schema({
    user:{type: String},
    token:{type: String},
    email:{type: String},
    name:{type: String},
    gender:{type: String},
    pic:{type: String},
})
usuarioSchema.methods.encryptPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

usuarioSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password) 
}

const usuariosFacebook = mongoose.model(usuarioCollection, usuarioSchema);

module.exports = {
    usuariosFacebook
} 