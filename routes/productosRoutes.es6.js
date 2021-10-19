const express = require('express')
const pRouter = express.Router();
const fs = require('fs');


class productos {

    constructor(nombre, descripcion, codigo, foto, precio, stock, timeStamp, id) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
        this.timeStamp = timeStamp;
        this.id = id;
    }

};

let key = false;

let arrPro = []

function readProducts() {
    try {
        const data = fs.readFileSync('./productos.json');
        const json = JSON.parse(data.toString('utf-8'))
        console.log("se va a leer el archivo")
        console.log(json)
        arrPro = json
    } catch (err) {
        try {
            console.log(["algo paso"])
        } catch (err) {
            throw new Error(err)
        }
    }

}

function genID() {
    readProducts()
    let tempID = arrPro.length + 1;
    return tempID.toString()
}
function genTimeStamp() {
    return Date.now();
}
function listarTodo() {
    readProducts()
    let arrTemp = arrPro.map(e => {
        let items = {}
        items = e
        return items
    })
    return arrTemp
}
function filtarID(a) {
    readProducts()
    let proID = arrPro.find(obj => obj.id === a)
    return proID

}
function exist() {
    if (arrPro.length > 0) {
        return true
    } else {
        return false
    }

}

function guardar(producto) {
    try {
        const data = fs.readFileSync('./productos.json', 'utf-8');
        const json = JSON.parse(data.toString('utf-8'))
        json.push(producto)
        try {
            fs.writeFileSync('./productos.json', JSON.stringify(json, null, '\t'))
        } catch (err) {
            throw new Error(err)
        }
    } catch (err) {
        try {
            console.log('No existe el archivo para agregar los productos, se procede a crearlo')
            fs.writeFileSync('./productos.json', JSON.stringify([producto]))
        } catch (err) {
            throw new Error(err)
        }
    }
}

function update(id, nombre, descripcion, codigo, foto, precio, stock) {
    readProducts()
    const proIndex = arrPro.findIndex(obj => obj.id == id)
    // const copyObj = arrPro[proIndex]

    arrPro[proIndex].nombre = nombre;
    arrPro[proIndex].descripcion = descripcion;
    arrPro[proIndex].codigo = codigo;
    arrPro[proIndex].foto = foto;
    arrPro[proIndex].precio = precio;
    arrPro[proIndex].stock = stock;
    arrPro[proIndex].timeStamp = genTimeStamp();
    arrPro[proIndex].id = id;
    // console.log(arrPro.splice(proIndex, 1, copyObj))
    // arrPro.splice(proIndex, 1, copyObj)
    try {
        fs.writeFileSync('./productos.json', JSON.stringify(arrPro, null, '\t'))
    } catch (err) {
        try {
            console.log('No existe el archivo para agregar los productos, se procede a crearlo')
            fs.writeFileSync('./productos.json', JSON.stringify([{ producto }]))
        } catch (err) {
            throw new Error(err)
        }
    }
    return arrPro[proIndex]
}

function del(a) {
    readProducts()
    const proIndex = arrPro.findIndex(obj => obj.id == a) 
    let delPro = arrPro.splice(proIndex, 1) 
    
    try {
        fs.writeFileSync('./productos.json', JSON.stringify(arrPro, null, '\t'))
    } catch (err) {
        try {
            console.log('No existe el archivo para agregar los productos, se procede a crearlo')
        } catch (err) {
            throw new Error(err)
        }
    }
    return delPro
}

// pRouter.get('/productos', (req, res, next) => {
//     console.log(arrPro)
//     var io = req.app.get('socketio');

//     res.render('main', {itemExist: true, arrPro: arrPro.SimpleMessage} )
// })
pRouter.get('/listar/', (req, res, next) => {
    res.json(listarTodo())
})

pRouter.get('/listar/:id', (req, res, next) => {

    console.log(req.params.id);
    const proFilter = filtarID(req.params.id);
    if (proFilter) {
        res.json(proFilter);
    } else {
        res.json('Producto no encontrado');
    }
})

pRouter.post('/agregar', (req, res) => {
    if(key===true){
        if (Object.entries(req.body).length > 0) {
            let productoN = new productos(req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock, genTimeStamp(), genID())
            guardar(productoN)
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
        res.json(update(req.params.id, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock, req.body.timeStamp))

    } else {
        res.json('No hay parametros')
    }}
    else{
        res.json({error:'-1', descripcion: 'ruta "/actualizar/id" método "put" no autorizada', })
    }

    })

pRouter.delete('/borrar/:id', (req, res) => {
    if(key===true){
    res.json(del(req.params.id))
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

