const {createLogger, transports, format} = require('winston')

const logger = createLogger({
    transports:[
        new transports.File({
            filename: 'warning.log',
            level: 'warn',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.Console({
            level: 'info'
        })
    ]
    
})

module.exports = logger