document.addEventListener("DOMContentLoaded", function () {
    console.log('loaded')
    const socket = io();
    const nombre = document.getElementById('title');
    const precio = document.getElementById("price");
    const img = document.getElementById("thumbnail");
    const button = document.getElementById("send")
    let arrPro = []
    let nomVal = ""
    let priVal = ""
    let imgVal = ""
    const myTemplate = document.getElementById("template")
    const render = document.getElementById("render")
    function genID() {

        let tempID = arrPro.length + 1;
        return tempID.toString()
    }

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
})

