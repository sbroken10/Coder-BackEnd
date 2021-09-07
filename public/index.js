const socket = io();

socket.on('a', (data) =>{
    console.log(data)
    socket.emit('noti', 'hola server')
})