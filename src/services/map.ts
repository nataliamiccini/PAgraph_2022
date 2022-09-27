
export class MapValue<T>{
    private requests : Array<T>=[];

    constructor( requests?: T[]){
            this.requests = requests;
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
