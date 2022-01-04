const mongoose = require('mongoose');
const logger = require('../winston/log-service')

const URL = `mongodb+srv://root:steven10@coderhouse.n7hpz.mongodb.net/ecommerce?retryWrites=true&w=majority`
let rta = mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => logger.log('info', 'Mongo Conectado')).catch(err => console.log('error en la coneccion   ' + err));






