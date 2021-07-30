        const cantidadDePalabras = (longitud) => {
            return console.log(`La cantidad de palabras es: ${longitud} \n`);
          };


        const recorrerPalabra = async (texto, callback, tiempo = 1000) => {
            let words = texto.split(" ").filter((e) => {
              if (e !== "") {
                return e;
              }
              return "Inserte palabras";
            });
            let longitud = words.length;
            for (i in words) {
              await timer(tiempo);
              console.log(words[i]);
            }
            callback(longitud);
          };
          // timer para mostar palabras
          const timer = (tiempo) => {
            return new Promise((res, rej) => {
              setTimeout(() => {
                res();
              }, tiempo);
            });
          };
          // llamada asyncrona para mostrar palabra en orden
          (async () => {
            try {
              await recorrerPalabra("hola mundo coder", cantidadDePalabras);
              await recorrerPalabra("desafio tutor coder", cantidadDePalabras, 2000);
              await recorrerPalabra("esto es una prueba", cantidadDePalabras, 1000);
            } catch (error) {
              console.log(error);
            }
          })();