const mongoose = require('mongoose');

const carritoCollection = 'orders';


const carritoSchema = new mongoose.Schema({
    usuario: { type: Object},
    carrito: {type: Object},
    date:{type:String}
})

const order = mongoose.model(carritoCollection, carritoSchema);

module.exports = {
    order
} 