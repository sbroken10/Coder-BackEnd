document.addEventListener("DOMContentLoaded", function () {
    console.log('loaded')
    const socket = io();
    const nombre = document.getElementById('title');
    const precio = document.getElementById("price");
    const img = document.getElementById("thumbnail");
    const button = document.getElementById("send")
    const arrPro = [];
    let nomVal = ""
    let priVal = ""
    let imgVal = ""

    function genID() {

        let tempID = arrPro.length + 1;
        return tempID.toString()
    }
    
    nombre.addEventListener("keyup", function(e){
        console.log(e.target.value)
        nomVal = e.target.value;
    });
    

    precio.addEventListener("keyup", (e)=>{
        console.log(e.target.value)
        priVal = e.target.value;
        console.log(priVal)
    })

    img.addEventListener("keyup", (e) =>{
        imgVal = e.target.value;
        console.log(imgVal)
    })


    button.addEventListener("click", function(){
        arrPro.push({title: nomVal, price: priVal, thumbnail: imgVal, id: genID()})
        console.log({title: nomVal, price: priVal, thumbnail: imgVal, id: genID()})
        console.log(arrPro)
        console.log("Elementos guardados")
        socket.emit("productSave", arrPro)
    })

    socket.on('a', (data) => {
        console.log(data)
        socket.emit('noti', 'hola server')
    })
})

