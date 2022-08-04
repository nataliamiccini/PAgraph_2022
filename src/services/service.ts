import { User } from '../models/user-model';
import { Edge } from '../models/edge-model';
import { Graph } from '../models/graph-models';
import { Model, Sequelize, where, QueryTypes } from 'sequelize';
import { Singleton } from '../connection/Singleton';

const Graph1 = require('node-dijkstra')
const sequelize: Sequelize = Singleton.getConnection();

export function showAllGraph(req: any, res: any) {
  Edge.findAll({}).then(arr=>{
      console.log(arr);
      res.json(arr);
  });
};

export function test(id_graph:number, res:any){
  let elem=[];
  Edge.findAll({attributes: ['node_a'], where:{id_graph: id_graph}}).then( arr => {
      res.json(arr);
  });
}

export  async function nodi(req:number,res:any){
    let elem=[];
   await Edge.findAll({attributes: ['weight_edge'],where:{id_graph: req}}).then(arr=>{
        //res.json(arr);
        elem=arr
        console.log(arr);
    });
    return elem;
}

export async function WeightOfNodes(id_edge: string):Promise<any>{
  let elem=[];
   await Edge.findAll({attributes: ['weight_edge'], where:{ id_edge: id_edge}}).then(arr=>{
      //res.json(arr);
      console.log(arr);
      elem=arr
  });
  return elem;
}

/*export async function test ():Promise<any>{
  let a;
  let A=["a","0.146lnqn473k"]
  A.forEach(
    function(x){
  sequelize.query("SELECT * from graph where id_edge="+"'"+x+"'",
  {raw:true,
    type:QueryTypes.SELECT}
    ).then(arr2=>{
      console.log(arr2)
      console.log("ok")
      a=arr2
    });

   } )
return a;
}*/
export async function findMax():Promise<any>{
  let result=await sequelize.query(
    "SELECT MAX(versions) as max1 FROM edge",
    {
    type:QueryTypes.SELECT}
) 
let c=(Object.values(result))
return (c.map(item=>(item as any).max1))
}

export async function updateWeight(new_weight: number, id_edge:any, res:any){
  let alpha=0.8;
  let keys;
let version;
let graphID
let c;
let d;
let m=Number(await findMax())

  id_edge.forEach(
  async function(x){

    version= await sequelize.query(
    "SELECT versions  FROM edge where id_edge="+"'"+x+"'",
    {raw:true,
    type:QueryTypes.SELECT}) 

    c=(Object.values(version));

      graphID=await sequelize.query(
        "SELECT FKid_graph  FROM edge where id_edge="+"'"+x+"'",
        {raw:true,
        type:QueryTypes.SELECT}) 
    
    d=(Object.values(graphID));

    //trovo tutti i campi della tabella edge che hanno versione e id del grafo di quello nel body
    Edge.findAll({ where:{versions:(c.map(item=>(item as any).versions)),FKid_graph:(d.map(item=>(item as any).FKid_graph))}} ).then(arr2=>{
    m+=1;
    //prendo i valori dell'array di elementi
    keys =Object.values(arr2);
    //prendo ogni elemento dell'array
    for(let i=0; i<keys.length;i++){ 

      let ID = Math.random().toString(36);

      if(keys[i].id_edge===x) {     
      Edge.create({id_edge:ID, node_a:keys[i].node_a, node_b:keys[i].node_b,versions:m, weight_edge:alpha*keys[i].weight_edge+(1-alpha)*new_weight,modify_date:"2022-07-31T15:40:00+01:00",FKuser_id:keys[i].FKuser_id,FKid_graph:keys[i].FKid_graph})
      
    }else {
      Edge.create({id_edge:ID, node_a:keys[i].node_a, node_b:keys[i].node_b,versions:m, weight_edge:keys[i].weight_edge,modify_date:"2022-07-31T15:40:00+01:00",FKuser_id:keys[i].FKuser_id,FKid_graph:keys[i].FKid_graph})
    }
    
  }
     
  });
  });
 res.json("Il grafo è stato aggiornato")
}


export function filterGraph(num_nodi:number,num_archi:number,res:any){

}
/*export function findMAX(){
  sequelize.query(
    "SELECT MAX(id_graph) as max FROM graph",
    {raw:true,
      type:QueryTypes.SELECT}
  ).then(arr=>{
    console.log(arr.map(item=>(item as any).max)[0])
    arr.map(item=>(item as any).max)[0];
  })
}*/


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
             
        Edge.create({id_edge:ID,id_graph:max+2,node_a:nodi_esterni[i],node_b:String(nodi_interni[z]),weight_edge:costo[z],modify_date:"2022-07-31T15:40:00+01:00",FKuser_id:"Wos78BnB09"}).then((arr)=>{
        });
      } 
    }        
  }
  tot_e.add(nodi_esterni)
  n_esterni = tot_e.size;
  return tot = 0.25*n_esterni + 0.01*n_archi;
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
  await Edge.findAll({attributes: ['node_a', 'node_b', 'weight_edge'], where: {id_graph: id_graph}}).then(arr => {
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

export async function n_nodi(req: any, res: any): Promise<number>{
  let tot_node = new Set
  await Graph.findAll({where: {id_graph: req}}).then(arr => {
    for (let i in arr){
    tot_node.add(arr[i].getDataValue("node_a"))
    tot_node.add(arr[i].getDataValue("node_a"))
    }
  })
  //const array = Array.from(tot_node);
  return tot_node.size
};

export async function n_edge(req: any, res: any): Promise<number>{
  let tot_edge = new Set
  await Graph.findAll({where: {id_graph: req}}).then(arr => {
    for (let i in arr){
    tot_edge.add(arr[i].getDataValue("id_edge"))
    }
  })
  //const array = Array.from(tot_edge);
  return tot_edge.size
};

export async function cost(req: any, res: any): Promise<number>{
  let tot_edge = new Set
  let cost: number
  await Promise.all([n_nodi(req, res), n_edge(req, res)]).then(result => {
    cost = (result[0]*0.25 + result[1]*0.01)
  }) 
  return cost
};