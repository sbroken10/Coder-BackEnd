const express = require('express')
const pRouter = express.Router();
const pMethods = require('../methods/productosMethods.es6')
const dotenv = require('dotenv').config();


pRouter.get('/', (req, res) => {
    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    atlas.listarTodo().then((data) => res.json(data))
});

pRouter.get('/listar/:id', (req, res, next) => {
    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    if (req.params) {
        atlas.filtrarID(req.params.id).then((data) => {
            if (data === false) {
                res.send('El objeto ID no existe')
            } else {
                res.json(data)
            }
        });
    } else {
        res.json('Ingrese el ID');
    }
})

pRouter.get('/listar/:categoria', (req, res, next) => {

    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    if (req.params) {
        atlas.filtrarCategoria(req.params.categoria).then((data) => {
            if (data === false) {
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
    if (key === true) {
        if (Object.entries(req.body).length > 0) {
            let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price)
            atlas.agregarProducto(productoN)
            res.json('Agregado')
        } else {
            res.json('No hay parametros')
        }
    } else {
        res.json({ error: '-1', descripcion: 'ruta "/agregar" método "post" no autorizada', })
    }
})

pRouter.put('/actualizar/:id', (req, res) => {
    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    if (key === true) {
        if (Object.entries(req.body).length > 0) {
            atlas.update(req.params.id, req.body.nombre, req.body.categoria, req.body.stock, req.body.price);
            res.json('Actualizado')
        } else {
            res.json('No hay parametros')
        }
    }
    else {
        res.json({ error: '-1', descripcion: 'ruta "/actualizar/id" método "put" no autorizada', })
    }
})

pRouter.delete('/borrar/:id', (req, res) => {

    let atlas = new pMethods.mongoDbAtlas('ecommerce')
    if (key === true) {
        atlas.del(req.params.id)
        res.json(`Eliminado Producto ID ${req.params.id}`)
    } else {
        res.json({ error: '-1', descripcion: 'ruta "/borarr/id" método "delete" no autorizada', })
    }
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

