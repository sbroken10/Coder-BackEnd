const express = require('express');
const cRouter = express.Router();
const cMethods = require('../methods/carritoMethods.es6.js')
const modelP = require('../models/producto');
const modelU = require('../models/usuarios');
const logger = require('../winston/log-service.js');




cRouter.get('/agregar/:id', (req, res) => {

    let proID = req.params.id
    let cart = new cMethods.Carrito(req.session.cart ? req.session.cart : {})
    modelP.productos.findById(proID, (err, product) => {
        if (err) {
            res.redirect('/')
        }
        cart.agregar(product, product.id) 
        req.session.cart = cMethods.arrCarr
        logger.log('info', 'esto es el req.session.cart------>')
        logger.log('info', req.session.cart)
        res.redirect('/api/productos')
    })
})

cRouter.get('/listar', (req, res) => {
    if(req.session.cart){
        res.send(req.session.cart)
    }else {
        logger.log('error', 'No hay items en el carrito')
        res.redirect('/')
    }
})


cRouter.get('/checkout', (req, res) => {

    if (req.session.email) {
        modelU.usuarios.findOne({ email: req.session.email }, (err, user) => {
            if (err) {
                res.redirect('/')
            }
            if (req.session.cart) {
                let cart = new cMethods.Carrito(req.session.cart);
                cart.completarCompra(user)
                res.send(req.session.cart)
            } else {
                res.redirect('/')
            }
        }).sort({ date: -1 })
    } else {
        logger.log('error', 'no se ha iniciado sesion o existe un problema con la session')
        res.redirect('/')
    }

    
})

cRouter.delete('/borrar/:id', (req, res) => {
    let newCart = req.session.cart;
    let index = newCart.indexOf(req.params.id);
    if(req.session.cart) {
        newCart.splice(index, 1)
    }
    res.redirect('/api/carrito/listar')
})

cRouter.get('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})
cRouter.put('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})
cRouter.post('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})
cRouter.delete('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})

module.exports = cRouter;

