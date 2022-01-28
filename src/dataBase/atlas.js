const mongoose = require('mongoose');
const logger = require('../winston/log-service')
const dotenv = require('dotenv').config()

const URL = process.env.MONGOATLAS
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => logger.log('info', 'Mongo Conectado')).catch(err => logger.log('error', err));






