
export class Req <T,U,Z>{

    weight:T;
    edge_id:U[];
    request_id:Z;


    SetValue(request_id:Z,weight:T,edge_id:U[],){

        this.weight=weight;
        this.edge_id=edge_id;
        this.request_id=request_id;
    }
    GetId(){
       return this.request_id;
    }
    display():void { 
        console.log(`Id=${this.request_id},Peso = ${this.weight}, Id_arco = ${this.edge_id}`);
    }




}
