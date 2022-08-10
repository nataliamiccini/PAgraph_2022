import { User } from '../models/user-model';
import { Edge } from '../models/edge-model';
import { Graph } from '../models/graph-models';
import { Model, Sequelize, where, QueryTypes } from 'sequelize';
import { Singleton } from '../connection/Singleton';


const Graph1 = require('node-dijkstra');
const sequelize: Sequelize = Singleton.getConnection();

export async function VersionsList(date:Date,id_edge:string,FKid_graph:number,res:any){
  let a;

  if(!date && !id_edge){
    a = await Edge.findAll({attributes:["versions"], where:{FKid_graph:FKid_graph}});
  
    }else if(!date&& id_edge){
      a = await Edge.findAll({attributes:["versions"],where:{id_edge:id_edge, FKid_graph:FKid_graph} });
  
    }else if(!id_edge && date){
      a = await Edge.findAll({attributes:["versions"], where:{modify_date:date, FKid_graph:FKid_graph}});
    }
  return a;
  }

export async function ModelList(date:Date,id_edge:string,res:any):Promise<Array<any>>{
let a=[];
let id;
let mapModel: Map<number, number[] > = new Map();
if(!date && !id_edge){
  a = await Edge.findAll({attributes:["FKid_graph","versions"]});

  }else if(!date&& id_edge){
    a = await Edge.findAll({attributes:["FKid_graph","versions"],where:{id_edge:id_edge} });

  }else if(!id_edge && date){
    a = await Edge.findAll({attributes:["FKid_graph","versions"], where:{modify_date:date}});
  }

    for(let k =0; k<a.length;k++){

      id= a[k].getDataValue("FKid_graph");
      let result = [];

      const b= await Edge.findAll({attributes:["versions"], group: ['versions'],where:{FKid_graph:id}});

      for (let v=0; v<b.length; v++){
              result.push({
                version:b[v].getDataValue("versions")
                });
              }
            mapModel.set(id, result);
    }

  return (Array.from(mapModel));
}

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
};

export  async function nodi(req:number,res:any):Promise<number>{
 
  //await Edge.findAll({attributes: ['id_edge'],where:{FKid_graph: req}})
    //res.json(arr);
    
    let {count ,rows }= await Edge.findAndCountAll({where: {FKid_graph: req}})
    console.log("********"+count);
    return count;
 
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
 
}

/**
 * 
 * @param {Object} [option]
 * @param num_archi 
 * @param res 
 * 
 * @param {number} [option.num_nodi]
 * @param {number} [option.num_archi]
 */
export async function filterGraph (num_nodi: number, num_archi: number, res: any): Promise<Array<any>>{
    let ar = []
    if( num_nodi && !num_archi){
      const a = await Graph.findAll({attributes: ["id_graph", "tot_edge"], where: {tot_node: num_nodi}})
      ar.push(a)
    }
    else if (num_archi && !num_nodi){
      const b = await Graph.findAll({attributes: ["id_graph","tot_node"], where: {tot_edge: num_archi}})
      ar.push(b)
    }
    else if (num_nodi && num_archi){
      const c = await Graph.findAll({attributes: ["id_graph"], where: {tot_node: num_nodi, tot_edge: num_archi}})
      ar.push(c)
    }
    return ar
}


export function createGraph(req:any,FKuser_id:any,FKid_graph:any,res:any){
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
  let date;
  keys = Object.keys(req);
  val = Object.values(req);
  

  Object.getOwnPropertyNames(req).forEach(
    function (val1) {
    nodi_esterni.push(val1);
    
  });

  for(let i in nodi_esterni){
    nodi_interni=[];
    costo=[];
    createGraph(req[keys[i]],FKuser_id,FKid_graph,res)
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
  
        
        tot_c.push(costo[z]);
        n_archi=tot_c.length;
      
        n_interni=tot_i.length;
        tot_e.add(nodi_interni[z])
        //date=new Date.now();
        Edge.create({id_edge:ID,node_a:nodi_esterni[i],node_b:String(nodi_interni[z]),versions:1,weight_edge:costo[z],modify_date:Date.now(),FKuser_id:FKuser_id, FKid_graph:FKid_graph}).then((arr)=>{
        });
      } 
    }        
  }
  tot_e.add(nodi_esterni)
  n_esterni = tot_e.size;
  tot = 0.25*n_esterni + 0.01*n_archi
  //console.log("narchi"+n_archi)
  //Graph.create({id_graph:max, tot_node:n_esterni, tot_edge: n_archi, cost:tot})
  return tot ;
}; 
/*export async function updateGraph(req:any,idGraph:any,res:any){
  let tot_edge
  let tot_node
  
  tot_edge= await n_edge(idGraph,res)
  tot_node= await n_nodi(idGraph,res)
  console.log("tot_edge: "+tot_edge)

  Graph.update({tot_node,tot_edge},{where:{id_graph:idGraph}});

}*/

export async function updateE(){
  let idGraph=await MaxidGraph()
  let result = await sequelize.transaction(async (t) => {

  let {count ,rows }= await Edge.findAndCountAll({where: {FKid_graph: idGraph}})

  console.log("----- edge "+count)

   Edge.update({tot_edge:count},{where:{FKid_graph:idGraph}})

  });
}
export async function updateN(req:any,FKuser_id,res:any){
  let idGraph=await MaxidGraph()
  let result = await sequelize.transaction(async (t) => {
    let tot_node= await n_nodi(idGraph,res)
    let cost= await createGraph(req,FKuser_id,idGraph,res);
    let {count ,rows }= await Edge.findAndCountAll({where: {FKid_graph: idGraph}})
    await sequelize.query("UPDATE graph SET tot_node= "+tot_node+",tot_edge="+count+ " , cost="+cost+" WHERE id_graph="+idGraph,
    {raw:true,
      type:QueryTypes.RAW})
    console.log("----- node "+tot_node)

    User.decrement({token:cost},{where:{id_user:FKuser_id}}).then(arr=>{
      res.json("Hai pagato un totale di  "+ cost + " token")
    });
  });

}

export async function MaxidGraph():Promise<number>{
  let idGraph
  let max;
  await sequelize.query(
    "SELECT MAX(id_graph) as max FROM graph",
    {type:QueryTypes.SELECT}
    ).then(arr=>{
    let Max=(Object.values(arr))
    max= (Max.map(item=>(item as any).max));
    });

console.log("max: ",max++)
   idGraph=max++;
   return idGraph

};

export async function createTableGraph(req:any,FKuser_id:any,res:any){
let idGraph=await MaxidGraph()
Graph.create({id_graph:idGraph, tot_node:0 ,tot_edge:0, cost:0})

createGraph(req,FKuser_id,idGraph,res);
};

/*export function endGraph(req:any,FKuser_id:any,res:any){

  let x = createGraph(req,FKuser_id,res)
  console.log("totale costo "+x)
  User.decrement({token:x},{where:{id_user:FKuser_id}}).then(arr=>{
    res.json("Hai pagato un totale di  "+ x + " token")
  });
}*/

export async function findGraph(id_graph: number, versions: number, res: any): Promise< Map<string, Object>>{
  let map2: Map<string, Object> = new Map();
  let nodi_testa= new Set;
  await Edge.findAll({attributes: ['node_a', 'node_b', 'weight_edge'], where: {FKid_graph: id_graph, versions: versions}}).then(arr => {
    for ( let i = 0; i < arr.length; i++){
      nodi_testa.add(arr[i].getDataValue("node_a"));
    }
    nodi_testa.forEach( (x) => {
      let map3: Map<string, number> = new Map();
      for (let i = 0; i < arr.length; i++){
        if (arr[i].getDataValue("node_a") === x){
          map3.set(arr[i].getDataValue("node_b"), Number(arr[i].getDataValue("weight_edge")))
          map2.set(arr[i].getDataValue("node_a"), Object.fromEntries(map3))
        }
      }
    })
  });
  return map2
};

export async function path(id_graph: number, node_a: string, node_b: string, user_id: string, res: any): Promise<Array<any>>{
  var start = new Date().getTime();
  let ar = []
  const v = await Max(id_graph)
  await findGraph(id_graph, v, res).then( arr => {
    const route = new Graph1(Object.fromEntries(arr))
    ar.push(route.path(node_a, node_b, {cost: true}))
  })
  var end = new Date().getTime();
  ar.push({"timestamp" : String(Number(end - start) + " ms")})
 return ar 
};

export async function pathV(id_graph: number, versions: number, node_a: string, node_b: string, user_id: string, res: any): Promise<Array<any>>{
  var start = new Date().getTime();
  let ar = []
  await findGraph(id_graph, versions, res).then( arr => {
    const route = new Graph1(Object.fromEntries(arr))
    ar.push(route.path(node_a, node_b, {cost: true}))
  })
  var end = new Date().getTime();
  ar.push({"timestamp" : String(Number(end - start) + " ms")})
 return ar
};

export async function n_nodi(req: any, res: any): Promise<number>{
  let tot_node = new Set
  await Edge.findAll({where: {FKid_graph: req}}).then(arr => {
    for (let i in arr){
    tot_node.add(arr[i].getDataValue("node_a"))
    tot_node.add(arr[i].getDataValue("node_b"))
    }
  })
  //const array = Array.from(tot_node);
  console.log(tot_node)
  return tot_node.size
};

export  function n_edge1(FKid_graph: any, res:any){
 
  /*let count =  sequelize.query(
    "SELECT COUNT(FKid_graph) as num FROM edge WHERE FKid_graph="+FKid_graph,
    {raw:true,
      type:QueryTypes.RAW})
  
  let Max=(Object.values(count))

  let tot_edge= (Max.map(item=>(item as any).num));
  console.log(tot_edge)

  return tot_edge*/ 
};

export async function n_edge(FKid_graph: any, res:any): Promise<number>{
  let tot_edge = new Set
  await Edge.findAll({where: {FKid_graph: FKid_graph}}).then(arr => {
    for (let i in arr){
      tot_edge.add(arr[i].getDataValue("id_edge"))
    }
  })
  //const array = Array.from(tot_node);
  console.log(tot_edge)
  return tot_edge.size
};

export async function cost(req: any, res: any): Promise<number>{
 // let tot_edge = new Set
  let cost: number
  await Promise.all([n_nodi(req, res), n_edge(req, res)]).then(result => {
    cost = (result[0]*0.25 + result[1]*0.01)
  }) 
  return cost
};



async function Max (id_graph: number): Promise<number>{
  const result = await sequelize.query(
    "SELECT MAX(versions) as max1 FROM edge where FKid_graph" + id_graph,
    {
      type: QueryTypes.SELECT
    }
  )
  const c = (Object.values(result))
  return Number(c.map(item => (item as any).max1)) 
};

export async function decreaseToken(user_id: string, costo: number, res:any){
  await User.decrement({token: costo}, {where: {user_id: user_id}}).then( arr => {
    res.json("Hai pagato un totale di  "+ costo + "token")
  })

}


export async function chargingAdmin ( user_id: string, user: string, token: number, res: any ): Promise<any>{
  await User.increment({token: token}, {where: {id_user: user}}).then(arr => {
      res.json({"Effettuata ricarica di token": token});
  });
};

export async function getInfo(id_edge: number[]): Promise<any>{
  let array: Array<Object> = new Array
  for( let x of id_edge)  {
    await Edge.findAll({attributes: ["node_a", "node_b", "versions", "FKid_graph"], where: {id_edge: x}}).then(ar => {
      array.push(JSON.parse(JSON.stringify(ar)))
    })
  }
  return array
};


export async function simulationSeq (id_edge: number[], start: number[], end: number[], increment: number[], node_a: string, node_b: string, res: any ): Promise<any>  {
  const ar = await getInfo(id_edge)
  let map = await findGraph(ar[0][0].FKid_graph, ar[0][0].versions, res)
  let arr = []
  let arrg = []
  let b = []
  for ( let i = 0; i < id_edge.length; i++){
    b.push(map.get(ar[i][0].node_a))
    for (let y = Number(start[i]); y <= Number(end[i]); y+= Number(increment[i]) ){
      b[i][ar[i][0].node_b]=y
      let map1 = new Map(JSON.parse(JSON.stringify(Array.from(map))))
      
      arrg.push(map1)
      
      let route = new Graph1(Object.fromEntries(map1))
      
      arr.push(route.path(node_a, node_b, {cost: true}))
    }
  }
  const min_cost = Math.min(...arr.map(o => o.cost))
  arr.push({"The best result costs: ": min_cost})
  
  const index = arr.findIndex((co) => co.cost === min_cost);
  arr.push({"The best result is obtained with the follow graph: ": Object.fromEntries(arrg[index])})
  

return arr

};
