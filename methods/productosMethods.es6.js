const fs = require('fs');
const {options} = require('../dataBase/mariaDB.js');
const knex = require("knex")(options);


class productos {

    constructor(nombre, descripcion,stock) {
        this.nombre = nombre;
        this.categoria = descripcion;
        this.stock = stock;
    }

};

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

//KNEX MySql //



function leerProductosSQL(){

    knex.from('productos').select("*").then(
        (data) => {
                console.log(data) 
        }
    ).cath((err)=>{console.log(err); throw err}).finally(()=>{
        knex.destroy();
    })
};

function agregarProductoSQL(producto){

    let tableName = "productos"
    knex.createTable(tableName, table =>{
        table.increments("id").notNullTable();
        table.string('nombre', 15)
        table.strig('categoria',10)
        table.integer('stock');
    }).then(
        ()=>console.log('Tabala creada'+ ' ' +tableName),
        () =>{
            knex(tableName).insert(producto).then(()=> console.log('articulo creado'))
        },
        (err) => console.log(err),
        () => knex.destroy()
    )
}



module.exports = {
    // del,
    // update,
    // guardar,
    // filtarID,
    // listarTodo,
    genTimeStamp,
    genID,
    leerProductosSQL,
    agregarProductoSQL,
    // readProducts,
    productos
}