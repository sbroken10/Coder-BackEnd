import express from 'express'
import handlebars from 'express-handlebars'
import {router} from './routes/routes.js'
import {createServer} from "http";
import {Server} from 'socket.io'


const httpServer = createServer();
const io = new Server(httpServer, {

})

const app = express();

httpServer.listen(8080, () => {
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.sendFile('index.html')
})

app.use('/api', router)

io.on("connection", (socket) => {
    console.log(socket.id); 
  });

