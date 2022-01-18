document.addEventListener("DOMContentLoaded", function () {
    console.log('loaded')
    const socket = io();
    const nombre = document.getElementById('title');
    const precio = document.getElementById("price");
    const img = document.getElementById("thumbnail");
    const button = document.getElementById("send")
    let arrPro = []
    let chatLogs = []
    let nomVal = ""
    let priVal = ""
    let imgVal = ""
    let email = ""
    let message = ""
    const myTemplate = document.getElementById("template")
    const render = document.getElementById("render")
    const templateChat = document.getElementById("template-chat")
    const chatRender = document.getElementById("chatRender")
    const emailInput = document.getElementById("emailImput");
    const msg = document.getElementById("messageImput");
    const msgB = document.getElementById("messageButton")




    function genID() {

        let tempID = arrPro.length + 1;
        return tempID.toString()
    }

    function valEmail(data) {
        const regex = /^([a-zA-Z0-9_])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (regex.test(data)) {
            return true
        } else {
            return false
        }
    }

    emailInput.addEventListener("keyup", function (e) {
        email = e.target.value
        console.log(email)
    })

    msg.addEventListener("keyup", function (e) {
        message = e.target.value
    })

    nombre.addEventListener("keyup", function (e) {
        console.log(e.target.value)
        nomVal = e.target.value;
    });


    precio.addEventListener("keyup", (e) => {
        console.log(e.target.value)
        priVal = e.target.value;
        console.log(priVal)
    })

    img.addEventListener("keyup", (e) => {
        imgVal = e.target.value;
        console.log(imgVal)
    })


    button.addEventListener("click", function () {
        console.log(arrPro)
        console.log("Elementos guardados")
        socket.emit("productSave", { title: nomVal, price: priVal, thumbnail: imgVal, id: genID() })
    })

    msgB.addEventListener("click", function () {

        if (valEmail(email)) {
            let da = new Date();
            socket.emit("chat", { msg: message, usr: email, date: da.getDate() + "/" + da.getMonth() + "/" + da.getFullYear() + " " + da.getHours() + ":" + da.getMinutes() + ":" + da.getSeconds() })
        } else {
            alert("El correo introducido no es valido")
        }
    })

    socket.on('update', (data) => {
        console.log(data)
        arrPro = data
        console.log(arrPro)
        const template = Handlebars.compile(myTemplate.innerHTML)
        render.innerHTML = template({ itemExist: true, arrPro: arrPro })
    })
    socket.on('constant', (data) => {
        console.log(data)
        arrPro = data
        console.log(arrPro)
        const template = Handlebars.compile(myTemplate.innerHTML)
        render.innerHTML = template({ itemExist: true, arrPro: arrPro })
    })
    socket.on('message', (data) => {
        chatLogs = data
        console.log(chatLogs)
        const chatTemplate = Handlebars.compile(template.innerHTML)
        chatRender.innerHTML = chatTemplate({ messages: chatLogs })
    })
})

