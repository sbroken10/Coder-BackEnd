const express = require('express'),
    app = express(),
    http = require('http').Server(app);
const cRoutes = require('./routes/carritoRoutes.es6.js')
const pRoutes = require('./routes/productosRoutes.es6.js')
const fs = require('fs');
const mongoose = require('mongoose');

http.listen(8080, () => {
    console.log("servidor en el puerto 8080")
});






app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/productos', pRoutes)
app.use('/carrito', cRoutes)



