//Modules
// const compression = require('compression');
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
const cookie = require('cookie-parser');
const logger = require('./winston/log-service')






//Initializations
const app = express()
const http = require('http').Server(app);
require('./dataBase/atlas')
require('./passport/local-auth')
require('./passport/facebook-auth')

//Settings
http.listen(8080, () => {
    console.log("servidor en el puerto Heroku")
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
        mongoUrl: `mongodb+srv://root:steven10@coderhouse.n7hpz.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    secret: 'steven10',
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



app.use('/productos', pRoutes)
app.use('/carrito', cRoutes)
app.use('/usuario', uRoutes)

//Info

app.get('/info', (req, res) =>{
    
    res.send(process.memoryUsage())
})



















