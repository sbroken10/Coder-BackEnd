import express from 'express'
import {router} from './routes/routes.js'

const app = express();
const server = app.listen(8080, () => {
    console.log("servidor en el puerto 8080")
});

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)


