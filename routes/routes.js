import express from 'express'
const router = express.Router();

let arrPro = [
    {
        title: 'a',
        price: 11,
        thumbnail: 'url',
        id: '1'
    },
    {
        title: 'b',
        price: 22,
        thumbnail: 'url',
        id: '2'
    },
];
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



router.get('/a', (req, res) => {
    res.send(
        `<div>
        <h1> El listado de rutas es </h1>
        <ul>
        <li>/api/productos/listar</li>
        <li>/api/productos/listar/:id</li>
        <li>/api/productos/guardar</li>
        </ul>
        </div>`
    )
})


router.get('/productos/listar', (req, res, next) => {
    if(arrPro <= 0){
        res.json('No hay elementos cargados');
    }else{
        res.json(listarTodo());
        next()
    }
})

router.get('/productos/listar/:id', (req, res, next) => {

    console.log(req.params.id);
    const proFilter = filtarID(req.params.id);
    if(proFilter){
        res.json(proFilter);
    }else{
        res.json('Producto no encontrado');
    }
    
})


router.post('/productos/guardar', (req, res) => {
    console.log(req.body)
    if (Object.entries(req.body).length > 0) {
        
        let productoN = new productos(req.body.title, req.body.price, req.body.thumbnail, genID())
        console.log(req.body.title)
        console.log(req.body.price)
        console.log(req.body.thumbnail)
        arrPro.push({ ...productoN })
        res.json(req.body)
    } else {
        res.json('No hay parametros')
    }

})

router.put('/productos/actualizar/:id', (req, res) => {
    if (Object.entries(req.query).length > 0) {
        
        res.json(update(req.params.id,req.query.title, req.query.price, req.query.thumbnail))
    } else {
        res.json('No hay parametros')
    }

})
router.delete('/productos/borrar/:id', (req, res) => {
     
        res.json(del(req.params.id))

})

export {router}
