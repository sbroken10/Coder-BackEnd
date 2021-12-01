const SQLiteOptions = {
    client: 'sqlite3',
    connection: {
        filename:'./database/DB/ecommerce.sqlite'
},
useNullAsDefault: true
}

module.exports = {
    SQLiteOptions
}
    