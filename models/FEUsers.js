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
// usuarioSchema.methods.encryptPassword = (password) =>{
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// }

// usuarioSchema.methods.comparePassword = function(password){
//     return bcrypt.compareSync(password, this.password) 
// }

const FeUsuarios = mongoose.model(FEusuarioCollection, usuarioSchema);

module.exports = {
    FeUsuarios
} 