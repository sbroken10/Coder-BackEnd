const mongoose = require('mongoose');

const productoCollection = 'productos';

const productoSchema = new mongoose.Schema({
    nombre:{type: String, require: true, max:30},
    categoria:{type: String, require: true, max:30},
    stock:{type: Number, require: true},
    price:{type: Number, require: true},
    descripcion: {type: String},
    foto:{type:String}

})

const productos = mongoose.model(productoCollection, productoSchema);

module.exports = {
    productos
} 