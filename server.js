
const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http);



const handlebars = require('express-handlebars')
const router = require('./routes/routes.js')


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
    res.sendFile('index.html', {root: __dirname} )
})

io.on('connection', (socket) => {
    console.log(socket.id); 
    socket.emit('a', 'este es el mensajes')
    socket.on('noti', data =>{
        console.log(data)
    })
    socket.on('productSave', data =>{
        console.log(data)
    })
  });

