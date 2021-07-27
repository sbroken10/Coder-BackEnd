export default class operaciones{
    private num1:number = 0
    private num2:number = 0;
    constructor(a:number, b:number){
        this.num1 = a;
        this.num2 = b;
    }

    public suma(){
        return this.num1+this.num2;
    }

    public resta(){
        if(this.num1 < this.num2){
            return this.num2 - this.num1;
        }else{
            return this.num1 - this.num2;
        }
    }
}
