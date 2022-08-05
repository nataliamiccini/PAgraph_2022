
export class MapValue<T>{
    private requests : Array<T>=[];

    constructor(n? : number, defaultValue? : T){
        if ( n === undefined) {
            this.requests = [];
        } else {
            if ( n && defaultValue){
                this.requests = Array(n).fill(defaultValue);
            } else {
                this.requests = Array(n);
            }
        }
    }

    pushI(item : T){
        this.requests.push(item);
    }

    pop(){
        return this.requests.pop();
    }


}