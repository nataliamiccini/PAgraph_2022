
export class MapValue<T>{
    private requests : Array<T>=[];

    constructor(){
            this.requests = Array<T>();
    }

    pushI(item : T){
        this.requests.push(item);
    }

    pop(index : number){
        //return this.requests.pop();
        this.requests.splice(index,1);
    }

    IndexOf(item: T){
        return this.requests.indexOf(item);
    }



}
