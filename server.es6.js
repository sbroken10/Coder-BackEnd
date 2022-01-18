//Modules
const express = require('express')
const handlebars = require('express-handlebars');
const session = require('express-session');
const morgan = require('morgan')
const passport = require('passport');
const MongoStore = require('connect-mongo');
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const flash = require('connect-flash');
const logger = require('./winston/log-service')
const dotenv = require('dotenv').config();
const chMethods = require('./methods/chatMethods.js');
const pMethods = require('./methods/productosMethods.es6')
const path = require('path')

//Initializations
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http)
require('./dataBase/atlas')
require('./passport/local-auth')
require('./passport/facebook-auth')

//Settings
http.listen((process.env.PORT || 8080), () => {
    logger.log('info', "servidor en el puerto 8080")
});
app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))
app.set("view engine", "hbs");
app.set("views", "./views")
app.set('socket.io', io)

//Middlewares

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        mongoOptions: advancedOptions
    }),
    secret: process.env.MONGOSECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    app.locals.SingMessage = req.flash('SingMessage');
    next();
})
// app.use(function(req, res, next) {
//     res.status(404);
//     res.send('404: File Not Found');
// });
// app.use(function(req, res, next) {
//     res.status(403);
//     res.send('403: Forbiden');
// });


//Routes
const cRoutes = require('./routes/carritoRoutes.es6');
const pRoutes = require('./routes/productosRoutes.es6.js');
const uRoutes = require('./routes/usuarioRoutes.es6')
const chRoutes = require('./routes/chatRoutes')
const FeRoutes = require('./routes/frontEndLoginRoutes')


app.use('/api/productos', pRoutes)
app.use('/api/carrito', cRoutes)
app.use('/api/usuario', uRoutes)
app.use('/api/chat', chRoutes)
app.use('/api/', FeRoutes)



//Info

app.get('/info', (req, res) => {

    res.send(process.memoryUsage())
})
app.get('/', (req, res) => {
    if (req.session.email) {
        io.on('connection', (socket) => {
            logger.log('info', "socketID ---------------------------------------------------------->");
            logger.log('info', socket.id);
            let mensajes = new chMethods.mongoDbAtlas(1);
            mensajes.listarTodo().then((data) => socket.emit('message', data));
            socket.on('chat', data1 => {
                console.log(data1.msj)
                let arrMSG = data1.arr
                console.log(arrMSG)
                arrMSG.push({id: 'DM', user: req.session.email, mensaje: data1.msj})
                logger.log('info', "finMsg ----------------------------------------------------------------------------------------------->");
                console.log(arrMSG)
                io.emit('message', arrMSG)
            })
            let atlas = new pMethods.mongoDbAtlas('ecommerce')
            let productos = ''
            atlas.listarTodo().then((data) => {
                productos = data;
                let proData = JSON.stringify(data);
                productos = JSON.parse([proData])
                io.emit('productos', { user: req.session.email, state: true, arrPro: productos, itemExist: true })
            })


        })
        res.redirect('/api/usuario/profile')
    } else {
        res.redirect('/api/usuario/home')
    }
})





















