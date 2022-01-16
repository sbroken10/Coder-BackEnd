const mongoose = require('mongoose');
const model = require('../models/producto.js');
const logger = require('../winston/log-service')
const dotenv = require('dotenv').config();


class productos {

    constructor(nombre, descripcion, stock, price, id) {
        this.id = id
        this.nombre = nombre;
        this.categoria = descripcion;
        this.stock = stock;
        this.price = price;
    }
}

class mongoDbAtlas {

    constructor(nombreDB) {
        this.nombre = nombreDB;
    }

    async starter() {
        try {
            const URL = `mongodb+srv://root:steven10@coderhouse.n7hpz.mongodb.net/${this.nombre}?retryWrites=true&w=majority`
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            logger.log('info', 'Mongo Conectado')
        } catch (err) {
            logger.log('error', 'error en la coneccion   ' + err)
        }
    }

    async agregarProducto(producto) {
        await new model.productos({ nombre: producto.nombre, categoria: producto.categoria, stock: producto.stock, price: producto.price }).save().then(console.log('agregado'))
    }

    async listarTodo() {
        let productosList = await model.productos.find({})
        logger.log('warn', 'se cargaron los productos')
        return productosList
    }

    async filtrarID(id) {
        try{
            let productoFilter = await model.productos.find({ _id: id })
            return productoFilter
        }catch{
            let state = false
            return state
        }
            
        
    }

    async filtrarCategoria(id) {
        try{
            let categoriaFilter = await model.productos.find({ categiria: id })
            return categoriaFilter
        }catch{
            let state = false
            return state
        }
            
        
    }

    async update(idIn, nombreIn, categoriaIn, stockIn, priceIn) {
        await model.productos.updateOne({ _id: idIn }, { $set: { nombre: nombreIn, categoria: categoriaIn, stock: stockIn, price: priceIn } })
    }

    async del(id) {
        await model.productos.deleteOne({ _id: id })
    }
}

module.exports = {
                mongoDbAtlas,
                productos
            }
