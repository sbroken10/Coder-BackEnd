"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var operaciones = /** @class */ (function () {
    function operaciones(a, b) {
        this.num1 = 0;
        this.num2 = 0;
        this.num1 = a;
        this.num2 = b;
    }
    operaciones.prototype.suma = function () {
        return this.num1 + this.num2;
    };
    operaciones.prototype.resta = function () {
        if (this.num1 < this.num2) {
            return this.num2 - this.num1;
        }
        else {
            return this.num1 - this.num2;
        }
    };
    return operaciones;
}());
exports.default = operaciones;
