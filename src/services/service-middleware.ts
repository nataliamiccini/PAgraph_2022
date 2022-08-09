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
    result =[]
    let x=0;
    id_edge.forEach(
      async  function(x){
            await Edge.findByPk(x).then( arr => {
                    if (this.lenght!=0) x++ 
                });
                
        }
    )
    (x==id_edge.lenght)? result= true : result= false;
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