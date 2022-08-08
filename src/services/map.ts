
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

    pop(index : number){
        //return this.requests.pop();
        this.requests.splice(index,1);
    }

    IndexOf(item:T){
        return this.requests.indexOf(item);
    }



}