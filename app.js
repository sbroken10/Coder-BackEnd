"use strict";
function sepaText(fra, cb, temp) {
    if (temp === void 0) { temp = 1000; }
    var words = fra.split(" ");
    console.log(words);
    setTimeout(cb, temp);
}
sepaText("este texto es el texto numero 1", function () {
    sepaText("este texto es el texto numero 2", function () {
        sepaText("este texto es el texto numero 3", function () { return console.log("TAREA TERMINADA"); });
    }, 1000);
}, 3000);
