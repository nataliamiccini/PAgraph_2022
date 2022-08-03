import { User } from '../models/user-model';
import { Graph } from '../models/graph-model';
import { Model, Sequelize, where, QueryTypes } from 'sequelize';
import { Singleton } from '../connection/Singleton';

const Graph1 = require('node-dijkstra')
const sequelize: Sequelize = Singleton.getConnection();

export function showAllGraph(req: any, res: any) {
  Graph.findAll({}).then(arr=>{
      console.log(arr);
      res.json(arr);
  });
};

export function test(id_graph:number, res:any){
  let elem=[];
  Graph.findAll({attributes: ['node_a'], where:{id_graph: id_graph}}).then( arr => {
      res.json(arr);
  });
}

let max=0;
export function createGraph(req:any,res:any){
  let costo=[];
  let nodi_esterni=[];
  let nodi_interni=[];
  let keys;
  let val;
  let tot_i=[];
  let tot_c=[];
  let tot_e=new Set;
  let n_esterni;
  let n_interni;
  let n_archi;
  let tot;
  keys = Object.keys(req);
  val = Object.values(req);

  Object.getOwnPropertyNames(req).forEach(
    function (val1) {
    nodi_esterni.push(val1);
    
  });

  for(let i in nodi_esterni){
    nodi_interni=[];
    costo=[];
    createGraph(req[keys[i]],res)
    if((Object.getOwnPropertyNames(req[keys[i]])).length !==0){
      Object.getOwnPropertyNames(req[keys[i]]).forEach(
        function (x) {
          nodi_interni.push(Object.values(x));
          //console.log(x)
          
        }
      );

      Object.values(req[keys[i]]).forEach(
        function (y) {
          costo.push(y)
        }
      );
    }     
    if(nodi_interni.length!==0) {
      for(let z in nodi_interni){
        let ID = Math.random().toString(36);
        sequelize.query(
          "SELECT MAX(id_graph) as max FROM graph",
          {raw:true,
          type:QueryTypes.SELECT}
        ).then(arr=>{
        max= arr.map(item=>(item as any).max)[0];
        });
        
        tot_c.push(costo[z]);
        n_archi=tot_c.length;
      
        n_interni=tot_i.length;
        tot_e.add(nodi_interni[z])
             
        Graph.create({id_edge:ID,id_graph:max+2,node_a:nodi_esterni[i],node_b:String(nodi_interni[z]),weight_edge:costo[z],modify_date:"2022-07-31T15:40:00+01:00",FKuser_id:"Wos78BnB09"}).then((arr)=>{
        });
      } 
    }        
  }
  tot_e.add(nodi_esterni)
  n_esterni=tot_e.size;
  return tot=0.25*n_esterni+ 0.01*n_archi;
}; 

export function endGraph(req:any,res:any){
  let x= createGraph(req,res)
  console.log("totale costo "+x)
  User.decrement({token:x},{where:{id_user:"Wos78BnB09"}}).then(arr=>{
    res.json("Hai pagato un totale di  "+ x + "token")
  });
}

export async function findGraph(id_graph: number, res: any): Promise< Map<string, Map<string, number>>>{
  let map2: Map<string, Map<string, number>> = new Map();
  let nodi_testa= new Set;
  await Graph.findAll({attributes: ['node_a', 'node_b', 'weight_edge'], where: {id_graph: id_graph}}).then(arr => {
    for ( let i = 0; i < arr.length; i++){
      nodi_testa.add(arr[i].getDataValue("node_a"));
    }
    nodi_testa.forEach( (x) => {
      let map3: Map<string, number> = new Map();
      for (let i = 0; i < arr.length; i++){
        if (arr[i].getDataValue("node_a") === x){
          map3.set(arr[i].getDataValue("node_b"), arr[i].getDataValue("weight_edge"))
          map2.set(arr[i].getDataValue("node_a"), map3)
        }
      }
    })
  });
  return map2
};

export async function path(req: number, node_a: string, node_b: string, res: any): Promise<Array<any>>{
  let ar = []
  await findGraph(req, res).then( arr => {
    const route = new Graph1(arr)
    ar = route.path(node_a, node_b, {cost: true})
  })
 return ar
};