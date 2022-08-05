
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

    Some(req:any) {
        return this.requests.some(code => JSON.stringify(code) === JSON.stringify({ request_id: req }));
    }

    Neleme(){
       this.requests.forEach(
        function(x){
            //console.log(this.requests.indexOf(x))
            console.log(1)
        }
       )
    }


}