const { query } = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const model = require('../models/producto.js');
const fireDb = require('../dataBase/firebase.js')
const logger = require('../winston/log-service')
const persistence = 6;



class productos {

    constructor(nombre, descripcion, stock, price, id) {
        this.id = id
        this.nombre = nombre;
        this.categoria = descripcion;
        this.stock = stock;
        this.price = price;
    }
}

class fileSystem {

    constructor(nombreDB) {
        this.nombre = nombreDB;
    }

    genID() {
        let arrPro = [];
        try {
            const data = fs.readFileSync(`./${this.nombre}.json`);
            const json = JSON.parse(data.toString('utf-8'))
            logger.info("se va a leer el archivo")
            logger.info(json)
            arrPro = json
        } catch (err) {
            try {
                logger.info(["algo paso"])
                return 'No se encuentra el archivo solicitado'
            } catch (err) {
                throw new Error(err)
            }
        }
        let tempID = arrPro.length + 1;
        return tempID.toString()
    }

    genTimeStamp() {
        return Date.now();
    }

    agregarProducto(producto) {
        try {
            const data = fs.readFileSync(`./${this.nombre}.json`, 'utf-8');
            const json = JSON.parse(data.toString('utf-8'))
            json.push(producto)
            try {
                fs.writeFileSync(`./${this.nombre}.json`, JSON.stringify(json, null, '\t'))
            } catch (err) {
                throw new Error(err)
            }
        } catch (err) {
            try {
                console.log('No existe el archivo para agregar los productos, se procede a crearlo')
                fs.writeFileSync(`./${this.nombre}.json`, JSON.stringify([producto]))
            } catch (err) {
                throw new Error(err)
            }
        }
    }
    listarTodo() {
        let arrPro = [];
        try {
            const data = fs.readFileSync(`./${this.nombre}.json`);
            const json = JSON.parse(data.toString('utf-8'))
            console.log("se va a leer el archivo")
            console.log(json)
            arrPro = json
        } catch (err) {
            try {
                console.log(["algo paso"])
                return 'No se encuentra el archivo solicitado'
            } catch (err) {
                throw new Error(err)
            }
        }
        let arrTemp = arrPro.map(e => {
            let items = {}
            items = e
            return items
        })
        return arrTemp
    }
    filtarID(a) {
        let arrPro = [];
        try {
            const data = fs.readFileSync(`./${this.nombre}.json`);
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
        let proID = arrPro.find(obj => obj.id === a)
        return proID

    }

    update(id, name, categoria, price, stock) {
        let arrPro = [];
        try {
            const data = fs.readFileSync(`./${this.nombre}.json`);
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
        const proIndex = arrPro.findIndex(obj => obj.id == id)
        console.log('proIndex')
        console.log(proIndex)
        console.log('arrPro')
        console.log(arrPro)
        console.log('arrPro[proIndex]')
        console.log(arrPro[proIndex])
        arrPro[proIndex].nombre = name;
        arrPro[proIndex].categoria = categoria;
        arrPro[proIndex].price = price;
        arrPro[proIndex].stock = stock;
        arrPro[proIndex].id = id;
        // console.log(arrPro.splice(proIndex, 1, copyObj))
        // arrPro.splice(proIndex, 1, copyObj)
        try {
            fs.writeFileSync(`./${this.nombre}.json`, JSON.stringify(arrPro, null, '\t'))
        } catch (err) {
            try {
                console.log('No existe el archivo para agregar los productos, se procede a crearlo')
                fs.writeFileSync(`./${this.nombre}.json`, JSON.stringify([{ producto }]))
            } catch (err) {
                throw new Error(err)
            }
        }
        return arrPro[proIndex]
    }

    delete(a) {
        let arrPro = [];
        try {
            const data = fs.readFileSync(`./${this.nombre}.json`);
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
        const proIndex = arrPro.findIndex(obj => obj.id == a)
        let delPro = arrPro.splice(proIndex, 1)

        try {
            fs.writeFileSync(`./${this.nombre}.json`, JSON.stringify(arrPro, null, '\t'))
        } catch (err) {
            try {
                console.log('No existe el archivo para agregar los productos, se procede a crearlo')
            } catch (err) {
                throw new Error(err)
            }
        }
        return delPro
    }
};

class mySQL {

    constructor(nombreDB) {
        this.nombre = nombreDB;
    }

    agregarProducto(producto) {
        const { options } = require('../dataBase/mariaDB.js');
        const knex = require("knex")(options);
        let tableName = this.nombre
        knex.schema.hasTable(tableName).then((exist) => {
            if (exist) {
                knex(tableName).insert(producto).then(() => console.log('articulo creado'))
            } else {
                knex.schema.createTable(tableName, table => {
                    table.increments("id").notNullable();
                    table.string('nombre', 15)
                    table.string('categoria', 10)
                    table.integer('stock'),
                        table.integer('price');
                }).then(
                    () => {
                        console.log('Tabala creada' + ' ' + tableName)
                        knex(tableName).insert(producto).then(() => console.log('articulo creado'))
                    },
                    (err) => console.log(err),
                    () => knex.destroy()
                ).catch((err) => console.log(err))
            }
        })
    }

    listarTodo() {
        const { options } = require('../dataBase/mariaDB.js');
        const knex = require("knex")(options);
        return knex.from(this.nombre).select('*');
    }

    filtrarID(a) {
        const { options } = require('../dataBase/mariaDB.js');
        const knex = require("knex")(options);
        return knex.from(this.nombre).select('*').where('id', '=', a);
    }

    update(idIn, nombreIn, categoriaIn, stockIn) {
        const { options } = require('../dataBase/mariaDB.js');
        const knex = require("knex")(options);
        knex(this.nombre).where('id', '=', idIn).update({ categoria: categoriaIn, nombre: nombreIn, stock: stockIn }).then(console.log('Actualizado'))
        return knex.from(this.nombre).select('*').where('id', idIn);
    }

    del(id) {
        const { options } = require('../dataBase/mariaDB.js');
        const knex = require("knex")(options);
        knex(this.nombre).where('id', '=', id).del().then(console.log('Eliminado'))
    }
}

class SqLite3 {

    constructor(nombreDB) {
        this.nombre = nombreDB;
    }

    agregarProducto(producto) {
        const { SQLiteOptions } = require('../dataBase/sqlite3')
        const knex = require("knex")(SQLiteOptions);
        let tableName = this.nombre
        knex.schema.hasTable(tableName).then((exist) => {
            if (exist) {
                knex(tableName).insert(producto).then(() => console.log('articulo creado'))
            } else {
                knex.schema.createTable(tableName, table => {
                    table.increments("id").notNullable();
                    table.string('nombre', 15)
                    table.string('categoria', 10)
                    table.integer('stock'),
                        table.integer('price');
                }).then(
                    () => {
                        console.log('Tabala creada' + ' ' + tableName)
                        knex(tableName).insert(producto).then(() => console.log('articulo creado'))
                    },
                    (err) => console.log(err),
                    () => knex.destroy()
                ).catch((err) => console.log(err))
            }
        })
    }

    listarTodo() {
        const { SQLiteOptions } = require('../dataBase/sqlite3')
        const knex = require("knex")(SQLiteOptions);
        return knex.from(this.nombre).select('*');
    }

    filtrarID(a) {
        const { SQLiteOptions } = require('../dataBase/sqlite3')
        const knex = require("knex")(SQLiteOptions);
        return knex.from(this.nombre).select('*').where('id', '=', a);
    }

    update(idIn, nombreIn, categoriaIn, stockIn) {
        const { SQLiteOptions } = require('../dataBase/sqlite3')
        const knex = require("knex")(SQLiteOptions);
        knex(this.nombre).where('id', '=', idIn).update({ categoria: categoriaIn, nombre: nombreIn, stock: stockIn }).then(console.log('Actualizado'))
        return knex.from(this.nombre).select('*').where('id', idIn);
    }

    del(id) {
        const { SQLiteOptions } = require('../dataBase/sqlite3')
        const knex = require("knex")(SQLiteOptions);
        knex(this.nombre).where('id', '=', id).del().then(console.log('Eliminado'))
    }
}

class mongoDB {

    constructor(nombreDB) {
        this.nombre = nombreDB;
    }

    async starter() {
        try {
            const URL = `mongodb://localhost:27017/${this.nombre}`
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('Mongo Conectado')
        } catch (err) {
            console.log('error en la coneccion   ' + err)
        }
    }

    async agregarProducto(producto) {
        await new model.productos({ nombre: producto.nombre, categoria: producto.categoria, stock: producto.stock, price: producto.price }).save().then(console.log('agregado'))
    }

    async listarTodo() {
        let productosList = await model.productos.find({})
        console.log(productosList)
        return productosList
    }

    async filtrarID(id) {
        let productoFilter = await model.productos.find({ _id: id })
        return productoFilter
    }

    async update(idIn, nombreIn, categoriaIn, stockIn, priceIn) {
        await model.productos.updateOne({ _id: idIn }, { $set: { nombre: nombreIn, categoria: categoriaIn, stock: stockIn, price: priceIn } })
    }

    async del(id) {
        await model.productos.deleteOne({ _id: id })
    }
}

class mongoDbAtlas {

    constructor(nombreDB) {
        this.nombre = nombreDB;
    }

    async starter() {
        try {
            const URL = `mongodb+srv://root:steven10@coderhouse.n7hpz.mongodb.net/${this.nombre}?retryWrites=true&w=majority`
            let rta = await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            logger.log('info', 'Mongo Conectado')
        } catch (err) {
            logger.log('error', 'error en la coneccion   ' + err)
        }
    }

    async agregarProducto(producto) {
        await new model.productos({ nombre: producto.nombre, categoria: producto.categoria, stock: producto.stock, price: producto.price }).save().then(console.log('agregado'))
    }

    async listarTodo() {
        let productosList = await model.productos.find({})
        logger.log('warn', 'se cargaron los productos')
        return productosList
    }

    async filtrarID(id) {
        let productoFilter = await model.productos.find({ _id: id })
        return productoFilter
    }

    async update(idIn, nombreIn, categoriaIn, stockIn, priceIn) {
        await model.productos.updateOne({ _id: idIn }, { $set: { nombre: nombreIn, categoria: categoriaIn, stock: stockIn, price: priceIn } })
    }

    async del(id) {
        await model.productos.deleteOne({ _id: id })
    }
}

class firebase {

    constructor(nombreDB) {
        this.nombre = nombreDB;
    }



    async agregarProducto(producto) {
        const db = fireDb.admin.firestore();
        let query = db.collection(this.nombre)
        try {
            await query.doc().create({ nombre: producto.nombre, categoria: producto.categoria, stock: producto.stock, precio: producto.price })
        } catch (err) {
            logger.log('error', err)
        }
    }

    async listarTodo() {
        const db = fireDb.admin.firestore();
        let query = db.collection(this.nombre)
        try {
            const snapshot = await query.get()
            let docs = snapshot.docs;
            const productos = docs.map((doc) => ({
                id: doc.id,
                nombre: doc.data().nombre,
                categoria: doc.data().categoria,
                stock: doc.data().stock,
                precio: doc.data().precio
            }))
            logger.log('info', productos)
            logger.log('warning', productos)
            return productos
        } catch (err) {
            logger.log('error', err)
        }
    }

    async filtrarID(id) {
        const db = fireDb.admin.firestore();
        let query = db.collection(this.nombre)
        try {
            const doc = query.doc(`${id}`);
            let item = await doc.get();
            let res = item.data();
            return res;
        } catch (err) {
            logger.log('error', err)
        }
    }

    async update(idIn, nombreIn, categoriaIn, stockIn, priceIn) {
        const db = fireDb.admin.firestore();
        let query = db.collection(this.nombre)
        try {
            const doc = query.doc(`${idIn}`);
            await doc.update({ nombre: nombreIn, categoria: categoriaIn, stock: stockIn, precio: priceIn });
        } catch (err) {
            logger.log('error', err)
        }
    }

    async del(id) {
        const db = fireDb.admin.firestore();
        let query = db.collection(this.nombre)
        try {
            const doc = query.doc(`${id}`);
            let item = await doc.delete();
            return item
        } catch (err) {
            logger.log('error', err)
        }
    }


}

persistenceF(persistence);

function persistenceF(a) {
    switch (a) {

        case 1:
            module.exports = {
                fileSystem,
                persistence,
                productos
            }
            break
        case 2:
            module.exports = {
                mySQL,
                persistence,
                productos
            }
            break
        case 3:
            module.exports = {
                SqLite3,
                persistence,
                productos
            }
            break
        case 5:
            module.exports = {
                mongoDB,
                persistence,
                productos
            }
            break
        case 6:
            module.exports = {
                mongoDbAtlas,
                persistence,
                productos
            }
            break
        case 7:
            module.exports = {
                firebase,
                persistence,
                productos
            }
            break
    }
}