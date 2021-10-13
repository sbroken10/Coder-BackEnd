const express = require('express')
const cRouter = express.Router();
const arrPro = require('../server.es6.js')


class productos {

    constructor(a, b, c, d) {
        this.title = a;
        this.price = b;
        this.thumbnail = c;
        this.id = d;
    }

};
function genID() {

    let tempID = arrPro.length + 1;
    return tempID.toString()
}
function listarTodo() {
    let arr2 = arrPro.map(e => { e.title 
        let items = {}
        items = e
        return items
    })
    return arr2
}
function filtarID(a) {

    let proID = arrPro.find(obj => obj.id === a)
    return proID

}
function exist() {
    if(arrPro.length > 0){
        return true
    }else{
        return false
    }
    
}
function update(a,title,price,thumb){
    const proIndex = arrPro.findIndex(obj => obj.id == a)
    const copyObj = arrPro[proIndex]

    copyObj.title = title
    copyObj.price = price
    copyObj.thumbnail = thumb

    return arrPro[proIndex]

}
function del (a){
    
    const proIndex = arrPro.findIndex(obj => obj.id == a)
    return arrPro.splice(proIndex,1)

}

cRouter.get('/productos', (req, res, next) => {
    console.log(arrPro)
    var io = req.app.get('socketio');

    res.render('main', {itemExist: true, arrPro: arrPro.SimpleMessage} )
})

cRouter.get('/productos/listar/:id', (req, res, next) => {

    console.log(req.params.id);
    const proFilter = filtarID(req.params.id);
    if(proFilter){
        res.json(proFilter);
    }else{
        res.json('Producto no encontrado');
    }
    
})


cRouter.post('/productos/guardar', (req, res) => {
    console.log(req.body)
    if (Object.entries(req.body).length > 0) {
        
        let productoN = new productos(req.body.title, req.body.price, req.body.thumbnail, genID())
        arrPro.push({productoN })
        res.redirect('/api/productos')
    } else {
        res.json('No hay parametros')
    }

})

cRouter.put('/productos/actualizar/:id', (req, res) => {
    if (Object.entries(req.query).length > 0) {
        
        res.json(update(req.params.id,req.query.title, req.query.price, req.query.thumbnail))
    } else {
        res.json('No hay parametros')
    }

})
cRouter.delete('/productos/borrar/:id', (req, res) => {
     
        res.json(del(req.params.id))

})

module.exports = cRouter;

