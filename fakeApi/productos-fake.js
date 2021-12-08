const generador = require('../generador/productos-generador');
let usuarios = [];

const generar = (req, res) => {

    let cant = req.params.cant
    usuarios = [];
    console.log(req.params.cant)
    if(cant == 0){
        for (let i = 0; i < 10; i++) {
            let usuario = generador.get()
            usuario.id = i + 1
            usuarios.push(usuario)
        }
        res.send(usuarios)
    }else{
        for (let i = 0; i < cant; i++) {
            let usuario = generador.get()
            usuario.id = i + 1
            usuarios.push(usuario)
        }
        res.send(usuarios)
    }
}

module.exports = {
    generar
}