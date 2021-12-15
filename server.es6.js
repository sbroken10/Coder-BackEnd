const express = require('express'),
    app = express(),
    http = require('http').Server(app);
const cRoutes = require('./routes/carritoRoutes.es6.js');
const pRoutes = require('./routes/productosRoutes.es6.js');
const handlebars = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology:true
}


http.listen(8080, () => {
    console.log("servidor en el puerto 8080")
});

app.engine("hbs", handlebars({
    extname: "hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))
app.set("view engine", "hbs");
app.set("views", "./views")

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://root:steven10@coderhouse.n7hpz.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        mongoOptions: advancedOptions
    }),
    secret: 'steven10',
    resave: true,
    saveUninitialized: true
}));

app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/productos', pRoutes)
app.use('/carrito', cRoutes)







