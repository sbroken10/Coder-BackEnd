const logger = require('../winston/log-service')
const model = require('../models/orders')
const { transporterGmail } = require('../nodeMail/confing');
const { sms } = require('../twilio/config.js');



let arrCarr = []
let storedItem = null


class Carrito {
    constructor(items) {
        this.carrito = items.productos || {};
        this.TotalPrice = 0;
        this.ItemQnty = 0;


    }

    agregar(item, id) {

        if (!storedItem) {
            storedItem = this.carrito[id] = { producto: item, cantidad: 0, precio: 0 };
            storedItem.cantidad++;
            storedItem.precio = storedItem.producto.price * storedItem.cantidad;
            arrCarr.push(storedItem);
            ;
        } else if (storedItem.producto._id == id) {
            storedItem.cantidad++;
            storedItem.precio = storedItem.producto.price * storedItem.cantidad;

        } else {
            storedItem = this.carrito[id] = { producto: item, cantidad: 0, precio: 0 };
            storedItem.cantidad++;
            storedItem.precio = storedItem.producto.price * storedItem.cantidad;
            arrCarr.push(storedItem);

        }
    }

    async completarCompra(usuario) {
        await new model.order({
            usuario: usuario,
            carrito: arrCarr,
            date: Date.now()
        }).save((err, order) => {
            if (err) {
                logger.log('error', err)
            }
            let arrCarrString = JSON.stringify(arrCarr);
            let arrCarrFinal = JSON.parse(arrCarrString)          
            transporterGmail.sendMail({
                from: 'Back End Ecommerce Coderhouse',
                to: 'stivenpedraza_12@hotmail.com',
                subject: `Nuevo pedido de ${usuario.nombre}`,
                html: `<h1>Pedido ${order._id}</h1>
                        <ul>
                        <li>Usuario</li>
                        <li>Nombre: ${usuario.nombre}</li>
                        <li>e-Mail:${usuario.email}</li>
                        <li>Telefono:+${usuario.prefijo} ${usuario.telefono}</li>
                        <li>Direccion:${usuario.direccion}</li>
                        </ul>
                        <h2>Orden</h2>
                        ${arrCarrString}
                        `
            }, (err, info) => {
                if (err) {
                    logger.log('err', err);
                } logger.log('info', info);
            })
            let number = `+${usuario.prefijo}${usuario.telefono}`
            sms.messages.create({
                body:`Pedido ${order._id}                
                Usuario
                Nombre: ${usuario.nombre}
                e-Mail:${usuario.email}
                Telefono:+${usuario.prefijo} ${usuario.telefono}
                Direccion:${usuario.direccion}
                Orden
                ${arrCarrString}`,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${number}`
            }).then(message => logger.log('info', message.sid)).catch((err)=>logger.log('error', err))
            sms.messages.create({
                body: `Su pedido fue recibido con exito`,
                from: '+12674406874',
                to: `+${usuario.prefijo}${usuario.telefono}`
            }).then(message => logger.log('info', message.sid)).catch((err)=>logger.log('error', err))
        })
    }

};
module.exports = {
    Carrito,
    arrCarr,

}