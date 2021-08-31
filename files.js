import express from 'express'
import handlebars from 'express-handlebars'
import {router} from './routes/routes.js'
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


const app = express();
const server = app.listen(8080, () => {
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
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/aa', router)


app.get('/', (req, res) => {
    res.render("main", {} )
})

