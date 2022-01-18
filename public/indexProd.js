document.addEventListener("DOMContentLoaded", function () {
    console.log('loaded')
    const socket = io();
    let arrMSG = []
    let chatLogs = []
    let message = ""
    const myTemplate = document.getElementById("template")
    const render = document.getElementById("render")
    const templateChat = document.getElementById("template-chat")
    const chatRender = document.getElementById("chatRender")
    const msg = document.getElementById("messageImput");
    const msgB = document.getElementById("messageButton")

    msg.addEventListener("keyup", function (e) {
        message = e.target.value
    })

    msgB.addEventListener("click", function () {
        
        socket.emit("chat", {msj:message, arr: arrMSG})
    })


    socket.on('productos', (data) => {
        const template = Handlebars.compile(myTemplate.innerHTML)
        render.innerHTML = template({ itemExist: true, productos: data.arrPro })
    })
    socket.on('message', (data) => {

        chatLogs = data
        arrMSG = data
        const chatTemplate = Handlebars.compile(templateChat.innerHTML)
        chatRender.innerHTML = chatTemplate({ messages: chatLogs })
    })
})

