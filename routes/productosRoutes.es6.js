const express = require('express')
const pRouter = express.Router();
const pMethods = require('../methods/productosMethods.es6.js')
let key = true;


// pRouter.get('/productos', (req, res, next) => {
//     console.log(arrPro)
//     var io = req.app.get('socketio');

//     res.render('main', {itemExist: true, arrPro: arrPro.SimpleMessage} )
// })
pRouter.get('/listar/', (req, res, next) => {
    res.json(pMethods.leerProductosSQL())
})

pRouter.get('/listar/:id', (req, res, next) => {

    console.log(req.params.id);
    const proFilter = pMethods.filtarID(req.params.id);
    if (proFilter) {
        res.json(proFilter);
    } else {
        res.json('Producto no encontrado');
    }
})

pRouter.post('/agregar', (req, res) => {
    if(key===true){
        if (Object.entries(req.body).length > 0) {
            let productoN = new pMethods.productos(req.body.nombre, req.body.categoria,req.body.stock)
            pMethods.agregarProductoSQL(productoN)
            // res.redirect('/productos/listar')
            res.json('Agregado')
        } else {
            res.json('No hay parametros')
        }
    }else{
        res.json({error:'-1', descripcion: 'ruta "/agregar" método "post" no autorizada', })
    }
    

})

pRouter.put('/actualizar/:id', (req, res) => {
    if(key===true){
    if (Object.entries(req.body).length > 0) {
        res.json(pMethods.update(req.params.id, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock, req.body.timeStamp))

    } else {
        res.json('No hay parametros')
    }}
    else{
        res.json({error:'-1', descripcion: 'ruta "/actualizar/id" método "put" no autorizada', })
    }

    })

pRouter.delete('/borrar/:id', (req, res) => {
    if(key===true){
    res.json(pMethods.del(req.params.id))
    }else{
        res.json({error:'-1', descripcion: 'ruta "/borarr/id" método "delete" no autorizada', })
    }
})

pRouter.get('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})
pRouter.put('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})
pRouter.post('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})
pRouter.delete('*', (req, res) => {
    res.json({error:'-2', descripcion: 'ruta no implementada', })
})

module.exports = pRouter;

