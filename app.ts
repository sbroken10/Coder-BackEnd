
function sepaText(fra:string, cb:Function, temp:number = 1000){

    let words = fra.split(" ")
    console.log(words)
    setTimeout(cb, temp)
    
    
}

sepaText("este texto es el texto numero 1" , 
        () => {sepaText("este texto es el texto numero 2", 
            () => {sepaText("este texto es el texto numero 3",
                ()=> console.log("TAREA TERMINADA")
                    )},1000
                )},
        3000)