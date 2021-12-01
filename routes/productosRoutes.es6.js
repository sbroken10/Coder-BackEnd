const { response } = require('express');
const express = require('express')
const pRouter = express.Router();
const pMethods = require('../methods/productosMethods.es6.js')
let key = true;

pRouter.get('/listar/', (req, res) => {

    switch (pMethods.persistence) {
        case 1:
            let FS = new pMethods.fileSystem('productos')
            res.json(FS.listarTodo());
            break
        case 2:
            let SQL = new pMethods.mySQL('productos')
            SQL.listarTodo().then((data) => res.json(data))
            break
        case 3:
            let SqLite3 = new pMethods.SqLite3('productos')
            SqLite3.listarTodo().then((data) => res.json(data))
            break
        case 5:
            let mongo = new pMethods.mongoDB('ecommerce')
            mongo.starter();
            mongo.listarTodo().then((data) => res.json(data))
            break
        case 6:
            let atlas = new pMethods.mongoDbAtlas('ecommerce')
            atlas.starter();
            atlas.listarTodo().then((data) => res.json(data))
            break
        case 7:
            let firebase = new pMethods.firebase('productos')
            res.json(firebase.listarTodo())
            break
    }
});

pRouter.get('/listar/:id', (req, res, next) => {

    switch (pMethods.persistence) {
        case 1:
            let FS = new pMethods.fileSystem('productos')
            const proFilter = FS.filtarID(req.params.id);
            if (proFilter) {
                res.json(proFilter);
            } else {
                res.json('Ingrese el ID');
            }
            break
        case 2:
            let SQL = new pMethods.mySQL('productos')
            if (req.params) {
                SQL.filtrarID(req.params.id).then((data) => res.json(data));
            } else {
                res.json('Ingrese el ID');
            }
            break
        case 3:
            let SqLite3 = new pMethods.SqLite3('productos')
            if (req.params) {
                SqLite3.filtrarID(req.params.id).then((data) => res.json(data));
            } else {
                res.json('Ingrese el ID');
            }
            break
        case 5:
            let mongo = new pMethods.mongoDB('ecommerce')
            mongo.starter();
            if (req.params) {
                mongo.filtrarID(req.params.id).then((data) => res.json(data));
            } else {
                res.json('Ingrese el ID');
            }
            break
        case 6:
            let atlas = new pMethods.mongoDbAtlas('ecommerce')
            atlas.starter();
            if (req.params) {
                atlas.filtrarID(req.params.id).then((data) => res.json(data));
            } else {
                res.json('Ingrese el ID');
            }
            break

    }
})

pRouter.post('/agregar', (req, res) => {

    switch (pMethods.persistence) {
        case 1:
            let FS = new pMethods.fileSystem('productos');
            let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price, FS.genID());
            FS.agregarProducto(productoN);
            res.json('Se agrego el producto');
            break
        case 2:
            let SQL = new pMethods.mySQL('productos')
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price)
                    SQL.agregarProducto(productoN)
                    // res.redirect('/productos/listar')
                    res.json('Agregado')
                } else {
                    res.json('No hay parametros')
                }
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/agregar" método "post" no autorizada', })
            }
            break
        case 3:
            let SqLite3 = new pMethods.SqLite3('productos')
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price)
                    SqLite3.agregarProducto(productoN)
                    // res.redirect('/productos/listar')
                    res.json('Agregado')
                } else {
                    res.json('No hay parametros')
                }
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/agregar" método "post" no autorizada', })
            }
            break
        case 5:
            let mongo = new pMethods.mongoDB('ecommerce')
            mongo.starter();
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price)
                    mongo.agregarProducto(productoN)
                    // res.redirect('/productos/listar')
                    res.json('Agregado')
                } else {
                    res.json('No hay parametros')
                }
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/agregar" método "post" no autorizada', })
            }
            break
        case 6:
            let atlas = new pMethods.mongoDbAtlas('ecommerce')
            atlas.starter();
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price)
                    atlas.agregarProducto(productoN)
                    // res.redirect('/productos/listar')
                    res.json('Agregado')
                } else {
                    res.json('No hay parametros')
                }
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/agregar" método "post" no autorizada', })
            }
            break
        case 7:
            let firebase = new pMethods.firebase('productos')
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    let productoN = new pMethods.productos(req.body.nombre, req.body.categoria, req.body.stock, req.body.price)
                    firebase.agregarProducto(productoN)
                    // res.redirect('/productos/listar')
                    res.json('Agregado')
                } else {
                    res.json('No hay parametros')
                }
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/agregar" método "post" no autorizada', })
            }
            break

    }


})

pRouter.put('/actualizar/:id', (req, res) => {
    switch (pMethods.persistence) {
        case 1:
            let FS = new pMethods.fileSystem('productos');
            res.json(FS.update(req.params.id, req.body.nombre, req.body.categoria, req.body.stock, req.body.price));
            break
        case 2:
            let SQL = new pMethods.mySQL('productos')
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    SQL.update(req.params.id, req.body.nombre, req.body.categoria, req.body.stock, req.body.price).then((data) => res.json(data));
                } else {
                    res.json('No hay parametros')
                }
            }
            else {
                res.json({ error: '-1', descripcion: 'ruta "/actualizar/id" método "put" no autorizada', })
            }
            break
        case 3:
            let SqLite3 = new pMethods.SqLite3('productos')
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    SqLite3.update(req.params.id, req.body.nombre, req.body.categoria, req.body.stock, req.body.price).then((data) => res.json(data));
                } else {
                    res.json('No hay parametros')
                }
            }
            else {
                res.json({ error: '-1', descripcion: 'ruta "/actualizar/id" método "put" no autorizada', })
            }
            break
        case 5:
            let mongo = new pMethods.mongoDB('ecommerce')
            mongo.starter();
            if (key === true) {
                if (Object.entries(req.body).length > 0) {
                    mongo.update(req.params.id, req.body.nombre, req.body.categoria, req.body.stock, req.body.price);
                    res.json('Actualizado')
                } else {
                    res.json('No hay parametros')
                }
            }
            else {
                res.json({ error: '-1', descripcion: 'ruta "/actualizar/id" método "put" no autorizada', })
            }
            break
        case 6:
            let atlas = new pMethods.mongoDbAtlas('ecommerce')
            atlas.starter();
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
            break
    }


})

pRouter.delete('/borrar/:id', (req, res) => {
    switch (pMethods.persistence) {
        case 1:
            let FS = new pMethods.fileSystem('productos');
            res.json(FS.delete(req.params.id));
        case 2:
            let SQL = new pMethods.mySQL('productos');
            if (key === true) {
                SQL.del(req.params.id)
                res.json(`Eliminado Producto ID ${req.params.id}`)
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/borarr/id" método "delete" no autorizada', })
            }
            break
        case 3:
            let SqLite3 = new pMethods.SqLite3('productos');
            if (key === true) {
                SqLite3.del(req.params.id)
                res.json(`Eliminado Producto ID ${req.params.id}`)
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/borarr/id" método "delete" no autorizada', })
            }
            break
        case 5:
            let mongo = new pMethods.mongoDB('ecommerce')
            mongo.starter();
            if (key === true) {
                mongo.del(req.params.id)
                res.json(`Eliminado Producto ID ${req.params.id}`)
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/borarr/id" método "delete" no autorizada', })
            }
            break
        case 6:
            let atlas = new pMethods.mongoDbAtlas('ecommerce')
            atlas.starter();
            if (key === true) {
                atlas.del(req.params.id)
                res.json(`Eliminado Producto ID ${req.params.id}`)
            } else {
                res.json({ error: '-1', descripcion: 'ruta "/borarr/id" método "delete" no autorizada', })
            }
            break
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

