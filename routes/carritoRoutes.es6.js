const express = require('express')
const cRouter = express.Router();
const cMethods = require('../methods/carritoMethods.es6.js')

cRouter.get('/listar', (req, res) => {
    res.json(cMethods.listarTodo())
})

cRouter.get('/listar/:id', (req, res) => {

    const proFilter = cMethods.filtarID(req.params.id);
    if (proFilter) {
        res.json(proFilter);
    } else {
        res.json('Producto no encontrado');
    }
    
})
cRouter.get('/agregar/:id', (req, res) => {

    cMethods.readProducts()
    let proID = arrPro.find(obj => obj.id === req.params.id)
    console.log(proID)
    if (proID) {
        let productoN = new cMethods.productoCarrito(proID, 'c-'+cMethods.genTimeStamp(), 'c-'+cMethods.genID())
        cMethods.agregarCarrito(productoN)
        // res.redirect('/productos/listar')
        res.json('Agregado')
    } else {
        res.json('Producto no encontrado')
    }
})

cRouter.delete('/borrar/:id', (req, res) => {
        res.json(del(req.params.id))
})

cRouter.get('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})
cRouter.put('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})
cRouter.post('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})
cRouter.delete('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})

module.exports = cRouter;

