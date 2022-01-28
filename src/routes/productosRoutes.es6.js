const express = require('express')
const pRouter = express.Router();
const pMethods = require('../methods/productosMethods.es6')
const dotenv = require('dotenv').config();

let key = true;

pRouter.get('/', (req, res) => {
    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    atlas.listarTodo().then((data) => res.json(data))
});

pRouter.get('/listar/:id', (req, res, next) => {
    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    if (req.params) {
        atlas.filtrarID(req.params.id).then((data) => {
            if (!data.length) {
                res.send('El objeto ID no existe')
            } else {
                res.json(data)
            }
        });
    } else {
        res.json('Ingrese el ID');
    }
})

pRouter.get('/listar-categoria/:categoria', (req, res, next) => {

    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    if (req.params) {
        atlas.filtrarCategoria(req.params.categoria).then((data) => {
            if (!data.length) {
                res.send('La categoria no existe')
            } else {
                res.json(data)
            }
        });
    } else {
        res.json('Ingrese el ID');
    }
})

pRouter.post('/agregar', (req, res) => {
    let atlas = new pMethods.mongoDbAtlas('ecommerce')
        if (Object.entries(req.body).length > 0) {
            let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price, req.body.descripcion, req.body.foto)
            atlas.agregarProducto(productoN)
            res.json('Agregado')
        } else {
            res.json('No hay parametros')
        }
})

pRouter.put('/actualizar/:id', (req, res) => {
    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    
        if (Object.entries(req.body).length > 0) {
            atlas.update(req.params.id, req.body.nombre, req.body.categoria, req.body.stock, req.body.price);
            res.json('Actualizado')
        } else {
            res.json('No hay parametros')
        }
})

pRouter.delete('/borrar/:id', (req, res) => {

    let atlas = new pMethods.mongoDbAtlas('ecommerce')
        atlas.del(req.params.id)
        res.json(`Eliminado Producto ID ${req.params.id}`)
})

pRouter.get('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})
pRouter.put('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})
pRouter.post('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})
pRouter.delete('*', (req, res) => {
    res.json({ error: '-2', descripcion: 'ruta no implementada', })
})

module.exports = pRouter;

