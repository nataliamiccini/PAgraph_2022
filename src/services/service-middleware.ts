import { User } from '../models/user-model';
import { Edge } from '../models/edge-model';
import { Graph } from '../models/graph-models';
import { Sequelize} from 'sequelize';
import { Singleton } from '../connection/Singleton';

const sequelize: Sequelize = Singleton.getConnection();

/**
 * Funzione checkCreator
 * 
 * Questa funzione viene utilizzata come middleware per verificare che l'utente che sta effettuando la 
 * richiesta sia effettivamente il creator di uno specifico grafo.
 * In particolare, viene utilizzata nella rotta che consente al creator di visualizzare tutte le richieste
 * di modifica del grafo e in quelle per accettare o rigettare eventuali modifiche.
 * 
 * @param FKuser_id id dell'utente 
 * @param res risposta da parte del sistema
 * @returns true se l'id appartiene al creatore del grafo, false altrimenti
 */
export async function checkCreator ( FKuser_id: string, res: any): Promise<boolean> {
    let result: any
    await User.findAll({attributes: ["id_user"], where: {id_user: FKuser_id}}).then( arr => {
        result= arr
    })
    return result;
};

/**
 * Funzione checkUserExistance
 * 
 * Permette di verificare l'esistenza di un utente a partire dal suo id
 * 
 * @param id_user id dell'utente
 * @param res risposta da parte del sistema
 * @returns true se esiste, false altrimenti
 */
 export async function checkUser ( id_user: string, res: any): Promise<boolean> {
    let result: any
    await User.findByPk(id_user).then( arr => {
    result= arr
    })
    return result;
};

/**
 * Funzione checkGraphExistance
 * 
 * Permette di verificare l'esistenza di un grafo a partire dal suo id
 * 
 * @param id_graph id del grafo
 * @param res risposta da parte del sistema
 * @returns true se esiste, false altrimenti
 */
 export async function checkGraphExistance ( id_graph: number, res: any): Promise<boolean> {
    let result: any
    await Graph.findByPk(id_graph).then( arr => {
        (arr)? result = true: result = false
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
 * @returns true se esiste, false altrimenti
 */
 export async function checkEdgeExistance ( id_edge: any, res: any): Promise<boolean> {
  let result
  let x=0;
  for (let i=0;i<id_edge.length;i++) {  
     await Edge.findByPk(id_edge[i]).then( arr => {
       (arr) ? x++ : x=0
     });
   }
  (x==id_edge.length)? result= true : result= false;
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
export async function checkToken ( id_user: string, id_graph: number, res: any): Promise<boolean> {
    let result: any
    let t = await User.findAll({where: {id_user: id_user}, attributes: ["token"]});
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
 * Funzione checkTokenCreate
 * 
 * Consente di verificare che i token dell'utente siano sufficienti per effettuare la creazione di un grafo.
 * Il costo del grafo viene calcolato a partire dal body della richiesta
 * 
 * @param id_user id dell'utente
 * @param req body contenente il grafo
 * @param res risposta da parte del sistema
 * @returns true se l'utente ha abbastanza token, false altrimenti
 */  
export async function checkTokenCreate ( id_user: string, req: any, res: any): Promise<boolean> {
  let result: any
  let t = await User.findAll({where: {id_user: id_user}, attributes: ["token"]});
  let c = await tot_cost(req)
    if (t[0].getDataValue("token")>c){
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
 * 
 * @param user_id id dell'utente
 * @param res risposta da parte del sistema
 * @returns 0 se l'utente è uno user, 1 se è un admin
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

/**
 * Funzione Range
 * 
 * Controlla che i range per effettuare la simulazione siano ammissibili.
 * Ad esempio il valore di partenza del peso di un arco deve essere minore rispetto a quello finale.
 * Inoltre il peso di un arco non pò essere nullo o negativo.
 * 
 * @param start Array dei valori di partenza 
 * @param end Array dei valori di fine
 * @param increment Array dee passi di incremento
 * @param res risposta da parte del sistema
 * @returns false se i range non sono ammissibili, true altrimenti
 */
export async function Range(start: any, end: any, increment: any, res: any): Promise<boolean>{
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

/**
 * Funzione tot_cost
 * 
 * Calcola il costo di creazione di un grafo a partire dal grafo nel body della richiesta
 * 
 * @param req body contenente il grafo da creare
 * @returns costo di creazione
 */
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