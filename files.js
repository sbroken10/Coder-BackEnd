import fs from "fs"
import express from 'express'

const app = express();
const server = app.listen(8080, () => {
    console.log("servidor en el puerto 8080")
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.get('/', (req, res) => {
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


app.get('/api/productos/listar', (req, res) => {
    if(arrPro <= 0){
        res.json('No hay elementos cargados');
    }else{res.json(listarTodo());}
})

app.get('/api/productos/listar/:id', (req, res) => {

    console.log(req.params.id);
    const proFilter = filtarID(req.params.id);
    if(proFilter){
        res.json(proFilter);
    }else{
        res.json('Producto no encontrado');
    }
    
})


app.post('/api/productos/guardar', (req, res) => {
    if (Object.entries(req.query).length > 0) {
        res.json(req.query)
        let productoN = new productos(req.query.title, req.query.price, req.query.thumbnail, genID())
        arrPro.push({ ...productoN })
    } else {
        res.json('No hay parametros')
    }

})

