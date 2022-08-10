import { User } from '../models/user-model';
import { Edge } from '../models/edge-model';
import { Graph } from '../models/graph-models';
import { Sequelize} from 'sequelize';
import { Singleton } from '../connection/Singleton';
import { isNamedExportBindings } from 'typescript';

const sequelize: Sequelize = Singleton.getConnection();

export async function checkCrator ( FKuser_id: string, res: any): Promise<boolean> {
    let result: any
    await User.findAll({attributes: ["id_user"], where: {id_user: FKuser_id}}).then( arr => {
    result= arr
    })
    return result;
}
/**
 * Funzione checkUserExistance
 * 
 * Permette di verificare l'esistenza di un utente a partire dal suo id
 * 
 * @param id_user id dell'utente
 * @param res risposta da parte del sistema
 * @returns 
 */
 export async function checkUser ( id_user: string, res: any): Promise<boolean> {
    let result: any
    await User.findByPk(id_user).then( arr => {
    result= arr
    })
    return result;
}

/**
 * Funzione checkGraphExistance
 * 
 * Permette di verificare l'esistenza di un grafo a partire dal suo id
 * 
 * @param id_graph id del grafo
 * @param res risposta da parte del sistema
 * @returns 
 */
 export async function checkGraphExistance ( id_graph: number, res: any): Promise<boolean> {
    let result: any
    result =false
    await Graph.findByPk(id_graph).then( arr => {
        (this.lenght!=0)? result = true: result = false
    });
    return result;
};

/**
 * Funzione checkGraphExistance
 * 
 * Permette di verificare l'esistenza di un arco a partire dal suo id
 * 
 * @param id_edge id dell'arco
 * @param res risposta da parte del sistema
 * @returns 
 */
 export async function checkEdgeExistance ( id_edge: any, res: any): Promise<boolean> {
    let result: any
    let x=0;

    let id=[];
   
    for (var key in id_edge) {
      if (id_edge.hasOwnProperty(key)) {
        id.push(id_edge[key]);
      }
    }
   for (let i=0;i<id.length;i++)
          {  
            console.log(id_edge[i])
            await Edge.findByPk(id_edge[i]).then( arr => {
                    if (this.lenght!=0) {
                        x++;
                    }
                });
            }

   (x==id.length)? result= true : result= false;
    return result;
};

/**
 * Funzione checkToken  
 * 
 * Controlla che l'utente abbia token sufficienti per effettuare un'azione
 * 
 * @param user_id id dell'utente
 * @param id_graph id del grafo
 * @param res risposta da parte del sistema
 */

export async function checkToken ( user_id: string, id_graph: number, res: any): Promise<boolean> {
    let result: any
    let t = await User.findAll({where: {id_user: user_id}, attributes: ["token"]})
    let c = await Graph.findAll({where: {id_graph: id_graph}, attributes: ["cost"]})
    
      if (t[0].getDataValue("token")>c[0].getDataValue("cost")){
        result=true;
      }
      else {
        result = false;
      }
    return result;
  };

 /**
 * Funzione checkRole
 * 
 * Controlla il ruolo di un utente
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 * @returns 
 */
 export async function checkRole(id_user: string, res: any): Promise<number>{
    let result
    await User.findAll({where:{id_user:id_user}}).then(arr=>{
        const role=(arr[0].getDataValue("role"))
        const user="user";
        const admin="admin";
            if (role===user){
                result=0;
            }else if(role==admin){
                result=1;
            }
    });
    return result;
};

export async function Range(start:any,end:any,increment:any,res: any): Promise<boolean>{
    let result: any
    if(start.filter(x => x>0).length < start.length || end.filter(x => x>0).length < end.length 
        || increment.filter(x => x>0).length < increment.length 
        || JSON.stringify(start) === JSON.stringify(end)){
      result = false
    }
    else if ((start).every((element, index) => element < end[index])) {
        result = true
    }
   return result
  };

export async function tot_cost(req: any) {
    let nodi = new Set()
    let edge = 0
    const keys = Object.keys(req);
    let values =  Object.values(req)
    Object.getOwnPropertyNames(req).forEach( (x) => {
        nodi.add(x)
    })
    console.log(nodi)
    for( var item in Array.from(nodi) ){
      Object.getOwnPropertyNames(req[keys[item]]).forEach( function (x) {
        nodi.add(x.toString());
        edge+=1
        
      })
    }
    const cost = nodi.size*0.25+edge*0.01
    return cost
  }