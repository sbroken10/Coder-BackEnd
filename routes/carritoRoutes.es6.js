const express = require('express')
const cRouter = express.Router();
const fs = require('fs');


class productoCarrito {

    constructor(producto , timeStamp, id) {
        this.producto = producto;
        this.timeStamp = timeStamp;
        this.id = id;
    }

};

let arrCarr = []
let arrPro = []



function readProducts() {
    try {
        const data = fs.readFileSync('./productos.json');
        const json = JSON.parse(data.toString('utf-8'))
        arrPro = json
    } catch (err) {
        try {
            console.log("algo paso")
        } catch (err) {
            throw new Error(err)
        }
    }
}

function readCarrito() {
    try {
        const data = fs.readFileSync('./carrito.json');
        const json = JSON.parse(data.toString('utf-8'))
        arrCarr = json
    } catch (err) {
        try {
            console.log("algo paso")
        } catch (err) {
            throw new Error(err)
        }
    }

}

function genID() {
    readCarrito()
    let tempID = arrCarr.length + 1;
    return tempID.toString()
}
function genTimeStamp() {
    return Date.now();
}
function listarTodo() {
    readCarrito()
    let arrTemp = arrCarr.map(e => {
        let items = {}
        items = e
        return items
    })
    return arrTemp
}

function filtarID(a) {
    readCarrito()
    let carID = arrCarr.find(obj => obj.id === a)
    return carID
}

function exist() {
    if(arrPro.length > 0){
        return true
    }else{
        return false
    }
    
}
function agregarCarrito(producto) {
    try {
        const data = fs.readFileSync('./carrito.json', 'utf-8');
        const json = JSON.parse(data.toString('utf-8'))
        json.push(producto)
        try {
            fs.writeFileSync('./carrito.json', JSON.stringify(json, null, '\t'))
        } catch (err) {
            throw new Error(err)
        }
    } catch (err) {
        try {
            console.log('No existe el archivo para agregar los productos, se procede a crearlo')
            fs.writeFileSync('./carrito.json', JSON.stringify([producto]))
        } catch (err) {
            throw new Error(err)
        }
    }
}

function del (a){
    
    const proIndex = arrCarr.findIndex(obj => obj.id == a)
    let delCarr = arrCarr.splice(proIndex,1)
    try {
        fs.writeFileSync('./carrito.json', JSON.stringify(arrCarr, null, '\t'))
    } catch (err) {
        try {
            console.log('No existe el archivo para agregar los productos, se procede a crearlo')
        } catch (err) {
            throw new Error(err)
        }
    }
    return delCarr
    
}

cRouter.get('/listar', (req, res) => {
    res.json(listarTodo())
})

cRouter.get('/listar/:id', (req, res) => {

    const proFilter = filtarID(req.params.id);
    if (proFilter) {
        res.json(proFilter);
    } else {
        res.json('Producto no encontrado');
    }
    
})


cRouter.get('/agregar/:id', (req, res) => {

    readProducts()
    let proID = arrPro.find(obj => obj.id === req.params.id)
    console.log(proID)
    if (proID) {
        let productoN = new productoCarrito(proID, 'c-'+genTimeStamp(), 'c-'+genID())
        agregarCarrito(productoN)
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

