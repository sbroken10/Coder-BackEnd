'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var router = express.Router();
var arrPro = require('../server.es6.js');

var productos = function productos(a, b, c, d) {
    _classCallCheck(this, productos);

    this.title = a;
    this.price = b;
    this.thumbnail = c;
    this.id = d;
};

;
function genID() {

    var tempID = arrPro.length + 1;
    return tempID.toString();
}
function listarTodo() {
    var arr2 = arrPro.map(function (e) {
        e.title;
        var items = {};
        items = e;
        return items;
    });
    return arr2;
}
function filtarID(a) {

    var proID = arrPro.find(function (obj) {
        return obj.id === a;
    });
    return proID;
}
function exist() {
    if (arrPro.length > 0) {
        return true;
    } else {
        return false;
    }
}
function update(a, title, price, thumb) {
    var proIndex = arrPro.findIndex(function (obj) {
        return obj.id == a;
    });
    var copyObj = arrPro[proIndex];

    copyObj.title = title;
    copyObj.price = price;
    copyObj.thumbnail = thumb;

    return arrPro[proIndex];
}
function del(a) {

    var proIndex = arrPro.findIndex(function (obj) {
        return obj.id == a;
    });
    return arrPro.splice(proIndex, 1);
}

router.get('/productos', function (req, res, next) {
    console.log(arrPro);
    var io = req.app.get('socketio');

    res.render('main', { itemExist: true, arrPro: arrPro.SimpleMessage });
});

router.get('/productos/listar/:id', function (req, res, next) {

    console.log(req.params.id);
    var proFilter = filtarID(req.params.id);
    if (proFilter) {
        res.json(proFilter);
    } else {
        res.json('Producto no encontrado');
    }
});

router.post('/productos/guardar', function (req, res) {
    console.log(req.body);
    if (Object.entries(req.body).length > 0) {

        var productoN = new productos(req.body.title, req.body.price, req.body.thumbnail, genID());
        arrPro.push({ productoN: productoN });
        res.redirect('/api/productos');
    } else {
        res.json('No hay parametros');
    }
});

router.put('/productos/actualizar/:id', function (req, res) {
    if (Object.entries(req.query).length > 0) {

        res.json(update(req.params.id, req.query.title, req.query.price, req.query.thumbnail));
    } else {
        res.json('No hay parametros');
    }
});
router.delete('/productos/borrar/:id', function (req, res) {

    res.json(del(req.params.id));
});

module.exports = router;
