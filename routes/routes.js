import express from 'express'
const router = express.Router();

let arrPro = [
    {
        title: 'Stone Cuting Sword',
        price: 2500,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Sword-128.png',
        id: '1'
    },
    {
        title: 'Mystical Mail',
        price: 3800,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Armor-128.png',
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


router.get('/productos/listar', (req, res, next) => {
    res.render('hellow.pug', {itemExist: exist(), arrPro: arrPro} )
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
        arrPro.push({ ...productoN })
        res.redirect('/')
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
