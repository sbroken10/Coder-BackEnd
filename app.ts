let resultado:number = 0;

async function operacion(ope:string, num1:number, num2:number) {
    let {default: operaciones} = await import('./operaciones')
    
    if(ope === 'suma' || '+'){
        let sumatoria = new operaciones(num1, num2)
        resultado = sumatoria.suma()
        return resultado
    }else{
        let resta = new operaciones(num1, num2)
        resultado = resta.resta()
        return resultado
    }
}

operacion("suma", 2, 3).then(()=> console.log(resultado)).catch((e) => console.log("error", e))