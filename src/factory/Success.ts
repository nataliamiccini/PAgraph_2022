
interface  Execute {
    getObj(): { status : number,  msg : string };
}

class CreatedGraph implements Execute {
    getObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "Bene! Il Grafo è stato creato."
        }
    }
}

class chargingAdmin implements Execute {
    getObj(): { status : number,  msg : string } {
        return {
            status: 200,
            msg: "Bene! E' stata effettuata una ricarica di token: "
        }
    }
}

export enum SuccessEnum {
    CreatedGraph,
    chargingAdmin
}


export function getObj(type: SuccessEnum): Execute{
    let retval: Execute = null;
    switch (type){
        case SuccessEnum.CreatedGraph:
            retval = new CreatedGraph();
            break;
        case SuccessEnum.chargingAdmin:
            retval = new chargingAdmin();
            break;
    }
    return retval;
}