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

//Initializations
const app = express()
const http = require('http').Server(app);
require('./dataBase/atlas')
require('./passport/local-auth')
require('./passport/facebook-auth')

//Settings
http.listen((process.env.PORT || 8080), () => {
    logger.log('info',"servidor en el puerto 8080")
});
app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))
app.set("view engine", "hbs");
app.set("views", "./views")

//Middlewares

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        mongoOptions: advancedOptions
    }),
    secret: process.env.MONGOSECRET,
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}));
app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next )=>{
    app.locals.SingMessage = req.flash('SingMessage');
    next();
})


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

app.get('/info', (req, res) =>{
    
    res.send(process.memoryUsage())
})
app.get('/', (req, res) =>{
    if(req.session.email){
        res.redirect('/api/productos/')
    }else{
        res.redirect('/api/usuario/home')
    }
})



















