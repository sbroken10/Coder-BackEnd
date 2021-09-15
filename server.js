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
let msgArr = []
const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);



const handlebars = require('express-handlebars')
const router = require('./routes/routes.js')

const fs = require('fs');

http.listen(8080, () => {
    console.log("servidor en el puerto 8080")
});
app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: "./views/layouts",
    partialsDir: "./views/partials"
}))
app.set("view engine", "hbs");
app.set("views", "./views")
app.use(express.static('./public'))

app.use('/api', router)
app.set('socketio', io)
app.get('/', (req, res, next) => {
    res.sendFile('index.html', { root: __dirname })
})

function guardar(message) {
    try {
        const data = fs.readFileSync('./messages.json', 'utf-8');
        console.log(data)
        const json = JSON.parse(data.toString('utf-8'))
        console.log(json)
        console.log(message)
        json.push({ ...message })
        console.log(json)
        try {
            fs.writeFileSync('./messages.json', JSON.stringify(json, null, '\t'))
        } catch (err) {
            throw new Error(err)
        }
    } catch (err) {
        try {
            console.log('No existe el archivo para agregar los productos, se procede a crearlo')
            fs.writeFile('./messages.json', JSON.stringify([{ ...message }]))
        } catch (err) {
            throw new Error(err)
        }
    }
}
function leer() {
    try {
        const data = fs.readFileSync('./messages.json');
        const json = JSON.parse(data.toString('utf-8'))

        console.log("se va a leer el archivo")
        console.log(json)
        msgArr = json
        console.log(msgArr)
    } catch (err) {
        try {
            console.log(["algo paso"])
        } catch (err) {
            throw new Error(err)
        }
    }

}



io.on('connection', (socket) => {
    console.log(socket.id);
    socket.emit('constant', arrPro)
    leer()
    socket.emit("updateMessage", msgArr)
    socket.on('productSave', data => {
        arrPro.push(data)
        console.log(arrPro)
        io.emit("update", arrPro)
    })
    socket.on('chat', data => {

        console.log("messages data")
        guardar(data);
        leer();
        io.emit("updateMessage", msgArr)
    })
});


