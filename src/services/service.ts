import { User } from '../models/user-model';
import { Edge } from '../models/edge-model';
import { Graph } from '../models/graph-models';
import { Model, Sequelize, where, QueryTypes } from 'sequelize';
import { Singleton } from '../connection/Singleton';
import {MapValue} from '../services/map'
import {Req} from '../services/request'


const Graph1 = require('node-dijkstra');
const sequelize: Sequelize = Singleton.getConnection();

let map= new MapValue<Req<number,string[],string>>();

export function Request(req: any, res: any) {  
  let x = new Req<number,string[],string>();
  let s4 = Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

  x.SetValue(s4 ,req.body.new_weight, req.body.id_edge);
  map.pushI(x);

  res.json("la richiesta è stata aggiunta");
};

export function ShowReq(res:any){
  res.json(map)
}

export function Reject(request_id:string,res:any){
  console.log("-----")
  let x = JSON.stringify(map);
  let y = JSON.parse(x);
  console.log("++++++++++++++++",y)
  for (let key in y) {
    if (y.hasOwnProperty(key)) {
      let z=y[key];
      let l=Object.values(z);
      console.log("++++++++++++++++",l)
      l.forEach(function(x){
       if (x["request_id"]===request_id) 
        {res.json("é stata eliminata la richiesta: "+request_id);
        let index= l.indexOf(x);
        map.pop(index);} else{res.json("Richiesta non trovata")}
            
      })
    }
  }
}
 export function Accept(request_id:string,res:any){
  let x = JSON.stringify(map);
  let y = JSON.parse(x);

  for (let key in y) {
    if (y.hasOwnProperty(key)) {
      let z=y[key];
      let l=Object.values(z);
      l.forEach(function(x){
       if (x["request_id"]===request_id) 
        {res.json("é stata accettata la richiesta: "+request_id);
        updateWeight(x["weight"], x["edge_id"], res);
        let index= l.indexOf(x);
        map.pop(index);
      }
            
      })
    }
  }
 }
/**
 * Funzione VersionsList
 * 
 * Questa funzione restituisce l’elenco delle revisioni dei pesi di un dato modello eventualmente
 * filtrando per data di modifica o arco
 *  
 * @param date data di modifica attraverso cui si vuole filtrare l'elenco delle revisioni
 * @param id_edge id dell'arco attraverso cui si vuole filtrare l'elenco delle revisioni
 * @param FKid_graph id del grafo di cui si vuole l'elenco delle revisioni
 * @param res risposta da parte del server
 * @returns elenco delle revisioni
 */
export async function VersionsList(date: Date, id_edge: string, FKid_graph: number, res: any): Promise<any> {
  let a: any;

  if(!date && !id_edge){
      a = await Edge.findAll({attributes: ["versions"], group: ['versions'], where: {FKid_graph: FKid_graph}});
  
  }else if(!date&& id_edge){
      a = await Edge.findAll({attributes: ["versions"], group: ['versions'], where: {id_edge: id_edge, FKid_graph: FKid_graph} });

  }else if(!id_edge && date){
      a = await Edge.findAll({attributes: ["versions"], group: ['versions'], where: {modify_date:date, FKid_graph: FKid_graph}});
  }
  return a;
};

/**
 * Funzione ModelList
 * 
 * Questa funzione restituisce l’elenco delle revisioni dei pesi di tutti i modelli eventualmente
 * filtrando per data di modifica o arco
 * 
 * @param date data di modifica attraverso cui si vuole filtrare l'elenco delle revisioni
 * @param id_edge id dell'arco attraverso cui si vuole filtrare l'elenco delle revisioni
 * @param res risposta da parte del server
 * @returns elenco delle revisioni
 */
export async function ModelList(date: Date, id_edge: string, res: any): Promise<Array<any>> {
  let a=[];
  let id;
  let mapModel: Map<number, number[] > = new Map();
  if(!date && !id_edge){
      a = await Edge.findAll({attributes: ["FKid_graph", "versions"]});

  } else if(!date&& id_edge){
      a = await Edge.findAll({attributes: ["FKid_graph", "versions"], where: {id_edge: id_edge} });

  } else if(!id_edge && date){
      a = await Edge.findAll({attributes: ["FKid_graph", "versions"], where: {modify_date: date}});
  }

  for(let k =0; k<a.length;k++){

    id= a[k].getDataValue("FKid_graph");
    let result = [];

    const b= await Edge.findAll({attributes:["versions"], group: ['versions'],where:{FKid_graph:id}});

    for (let v=0; v<b.length; v++){
        result.push({version: b[v].getDataValue("versions")})
    }
    mapModel.set(id, result);
  }

  return (Array.from(mapModel));
};

/**
 * Funzione findMax
 * 
 * Restituisce il valore massimo delle versioni presenti nel database
 * 
 * @returns valore massimo
 */
export async function findMax():Promise<any>{
  let result=await sequelize.query(
    "SELECT MAX(versions) as max1 FROM edge",
    {
    type:QueryTypes.SELECT}
  ) 
  let c=(Object.values(result))
  return (c.map(item=>(item as any).max1))
};

/**
 * Funzione updateWeight
 * 
 * Gestisce le richieste di cambio peso per uno o più archi da parte degli utenti autenticati e non.
 * 
 * @param new_weight nuovo peso che si vuole associare all'arco
 * @param id_edge id dell'arco
 * @param res risposta da parte del server
 */
export async function updateWeight(new_weight: number, id_edge:any, res:any){
  let alpha = process.env.ALPHA
 // (0 < process.env.ALPHA  < 1 )? alpha = process.env.ALPHA : alpha = 0.9
  let keys;
  let version;
  let graphID;
  let c;
  let d;
  let m=Number(await findMax());

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
          Edge.create({id_edge:ID, node_a:keys[i].node_a, node_b:keys[i].node_b,versions:m, weight_edge:Number(alpha)*keys[i].weight_edge+(1-Number(alpha))*new_weight,modify_date:Date.now(),FKuser_id:keys[i].FKuser_id,FKid_graph:keys[i].FKid_graph})
      
      }else {
          Edge.create({id_edge:ID, node_a:keys[i].node_a, node_b:keys[i].node_b,versions:m, weight_edge:keys[i].weight_edge,modify_date:Date.now(),FKuser_id:keys[i].FKuser_id,FKid_graph:keys[i].FKid_graph})
      }
    }
    });
  });
};

/**
 * Funzione filterGraph
 * 
 * Restituisce l’elenco dei modelli filtrando numero di nodi e/o numero di archi
 * 
 * @param num_nodi numero di nodi
 * @param num_archi numero di archi
 * @param res risposta da parte del server
 * @returns elenco dei modelli filtrati
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
};

/**
 * Funzione createGraph
 * 
 * Questa funzione consente di creare un nuovo modello seguendo l’interfaccia definita nella sezione 
 * API di https://www.npmjs.com/package/node-dijkstra ed in particolare di specificare 
 * il grafo con i relativi pesi
 * 
 * @param req body che contiene il grafo da creare
 * @param FKuser_id creatore del nuovo modello
 * @param FKid_graph id da associare al nuovo modello
 * @param res risposta da parte del sistema
 * @returns costo della creazione del grafo
 */
export function createGraph (req: any, FKuser_id: any, FKid_graph: any, res: any) {
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
    createGraph(req[keys[i]],FKuser_id,FKid_graph,res)
    if((Object.getOwnPropertyNames(req[keys[i]])).length !==0){
      Object.getOwnPropertyNames(req[keys[i]]).forEach(
        function (x) {
          nodi_interni.push(Object.values(x)); 
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
        Edge.create({id_edge:ID,node_a:nodi_esterni[i],node_b:String(nodi_interni[z]),versions:1,weight_edge:costo[z],modify_date:Date.now(),FKuser_id:FKuser_id, FKid_graph:FKid_graph}).then((arr)=>{
        });
      } 
    }        
  }
  tot_e.add(nodi_esterni)
  n_esterni = tot_e.size;
  tot = 0.25*n_esterni + 0.01*n_archi
  return tot 
}; 

/**
 * Funzione updateE
 * 
 * Esegue l'update del numero totale degli archi nella tabella Graph
 */
export async function updateE(){
  let idGraph=await MaxidGraph()
  let result = await sequelize.transaction(async (t) => {

  let {count ,rows }= await Edge.findAndCountAll({where: {FKid_graph: idGraph}})

  console.log("----- edge "+count)

   Edge.update({tot_edge: count}, {where: {FKid_graph: idGraph}})

  });
};

/**
 * Funzione updateN
 * 
 * Esegue l'update del numero totale dei nodi e del costo di creazione del grafo
 * 
 * @param req body contenente il grafo
 * @param FKuser_id id dell'utente che vuole effettuare l'update
 * @param res risposta da parte del server
 */
export async function updateN(req: any, FKuser_id: string, res: any){
  let idGraph=await MaxidGraph()
  let result = await sequelize.transaction(async (t) => {
    let tot_node= await n_nodi(idGraph);
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

};

/**
 * Funzione MaxidGraph
 * 
 * Trova il valore massimo degli id dei grafi presenti nel database e viene usato per
 * associare un nuovo id ad un nuovo grafo
 * 
 * @returns valore massimo
 */
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

/**
 * Funzione createTableGraph
 * 
 * Questa funzione crea un nuovo grafo nella tabella Graph
 * 
 * @param req body contenente il grafo 
 * @param FKuser_id id dell'utente che vuole creare il grafo
 * @param res risposta da parte del server
 */
export async function createTableGraph(req: any, FKuser_id: any, res: any){
  let idGraph=await MaxidGraph()
  Graph.create({id_graph:idGraph, tot_node:0 ,tot_edge:0, cost:0})

  createGraph(req,FKuser_id,idGraph,res);
};

/**
 * Funzione findGraph
 * 
 * Questa funzione prende il grafo dal database e lo converte in una Map secondo le specifiche 
 * del package node-dijkstra
 * 
 * @param id_graph id del grafo da convertire
 * @param versions versione del grafo
 * @param res risposta da parte del server
 * @returns grafo convertito
 */
export async function findGraph(id_graph: number, versions: number): Promise< Map<string, Object>>{
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

/**
 * Funzione decreaseToken
 * 
 * Questa funzione ha il compito di decrementare i token dell'utente che ha eseguito un modello
 * 
 * @param user_id id dell'utente
 * @param costo costo di creazione del grafo
 * @param res risposta da parte del server
 * @returns Operazione effettuata o meno
 */
export async function decreaseToken(user_id: string, costo: number, res:any){
  let result = []
  await User.decrement({token: costo}, {where: {id_user: user_id}}).then( arr => {
    (arr) ? result.push({'Hai pagato un totale di token ': costo})
            : result.push({'Operazione non andata a buon fine. Token non decrementati': costo})
  })
  return result
};

/**
 * Funzione path
 * 
 * Consente di eseguire il modello (specificando l’eventuale versione; di default si considera l’ultima disponibile),
 * specificando start e goal
 *  
 * @param id_graph id del grafo da eseguire
 * @param versions versione del grafo da eseguire
 * @param node_a nodo start
 * @param node_b nodo goal
 * @param res risposta da parte del sistema
 * @returns restituisce, sotto forma di JSON, il path, il relativo costo e il tempo impiegato per l'esecuzione
 */
export async function path(id_graph: number, versions: number, node_a: string, node_b: string, user_id: string, res: any): Promise<Array<any>>{
  var start
  let ar = []
  let v
  const c = await Graph.findAll({attributes: ["cost"], where: {id_graph: id_graph}}); 
  (!versions) ? v = await Max(id_graph) : v = versions
  await findGraph(id_graph, v).then( arr => {
    const route = new Graph1(Object.fromEntries(arr))
    start = new Date().getTime();
    ar.push(route.path(node_a, node_b, {cost: true}))
  }) 
  var end = new Date().getTime();
  const b = await decreaseToken(user_id, c[0].getDataValue("cost"), res)
  ar.push({"timestamp" : String(Number(end - start) + " ms")})
  ar.push(b)
 return ar
};



/**
 * Funzione n_nodi
 * 
 * Calcola il numero di nodi a partire dal grafo che si vuole creare
 * 
 * @param req body contenente il grafo da creare
 * @param res risposta da parte del server
 * @returns numero dei nodi
 */
export async function n_nodi(req: any): Promise<number>{
  let tot_node = new Set()
  await Edge.findAll({where: {FKid_graph: req}}).then(arr => {
    for (let i in arr){
    tot_node.add(arr[i].getDataValue("node_a"))
    tot_node.add(arr[i].getDataValue("node_b"))
    }
  })
  console.log(tot_node)
  return tot_node.size
};

/**
 * Funzione Max
 * 
 * Trova il valore massimo della versione di un dato grafo
 * 
 * @param id_graph id del grafo
 * @returns valore massimo
 */
async function Max (id_graph: number): Promise<number>{
  const result = await sequelize.query(
    "SELECT MAX(versions) as max1 FROM edge where FKid_graph=" + id_graph,
    {
      type: QueryTypes.SELECT
    }
  )
  const c = (Object.values(result))
  return Number(c.map(item => (item as any).max1)) 
};

/**
 * Funzione chargingAdmin
 * 
 * Consente ad un utente Admin di ricaricare il credito di un dato utente
 * 
 * @param email email dell'utente da ricaricare
 * @param token quantita' da ricaricare
 * @param res risposta da parte del server
 */
export async function chargingAdmin ( email: string, token: number, res: any ): Promise<any>{
  await User.increment({token: token}, {where: {email: email}}).then(arr => {
      res.json({"Effettuata ricarica di token": token});
  });
};

/**
 * Funzione getInfo
 * 
 * Consente di trovare delle informazione come nodo testa, nodo coda e id e versione del grafo di appartenenza
 * a partire dall'id di un arco
 *   
 * @param id_edge id del grafo
 * @returns informazioni
 */
export async function getInfo(id_edge: number[]): Promise<any>{
  let array: Array<Object> = new Array
  for( let x of id_edge)  {
    await Edge.findAll({attributes: ["node_a", "node_b", "versions", "FKid_graph"], where: {id_edge: x}}).then(ar => {
      array.push(JSON.parse(JSON.stringify(ar)))
    })
  }
  return array
};

/**
 * Funzione simulationSeq
 * 
 * Permette di effettuare una simulazione che consenta di variare:
 * - Peso relativo ad un arco specificando il valore di inizio, fine ed il passo di incremento
 * - Peso relativo a più archi specificando per ogni arco il valore di inizio, fine ed il passo di incremento
 * Nel caso di più archi le simulazioni sono sequenziali 
 * 
 * @param id_edge Array degli id degli archi di cui cambiare il peso
 * @param start Array dei valori di partenza
 * @param end Array dei valori di fine
 * @param increment Array del passo di incremento
 * @param node_a nodo start
 * @param node_b nodo goal
 * @param res risposta da parte del server
 * @returns tutti i percorsi possibili con i relativi costi, specificando il best result in termini di costo
 * e la relativa configurazione dei pesi
 */
export async function simulationSeq (id_edge: number[], start: number[], end: number[], increment: number[], node_a: string, node_b: string, res: any ): Promise<any>  {
  const ar = await getInfo(id_edge)
  let map = await findGraph(ar[0][0].FKid_graph, ar[0][0].versions)
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

/**
 * Funzione SimulationPar
 * 
 * Permette di effettuare una simulazione che consenta di variare:
 * - Peso relativo ad un arco specificando il valore di inizio, fine ed il passo di incremento
 * - Peso relativo a più archi specificando per ogni arco il valore di inizio, fine ed il passo di incremento
 * Nel caso di più archi le simulazioni sono parrallele 
 * 
 * @param id_edge Array degli id degli archi di cui cambiare il peso
 * @param start Array dei valori di partenza
 * @param end Array dei valori di fine
 * @param increment Array del passo di incremento
 * @param node_a nodo start
 * @param node_b nodo goal
 * @param res risposta da parte del server
 * @returns tutti i percorsi possibili con i relativi costi, specificando il best result in termini di costo
 * e la relativa configurazione dei pesi
 */
export async function SimulationPar (id_edge: number[], start: number[], end: number[], increment: number[], node_a: string, node_b: string, res: any ): Promise<Array<any>>  {
  const ar = await getInfo(id_edge)
  let map = await findGraph(ar[0][0].FKid_graph, ar[0][0].versions)
  let arr = []
  let arrg = []
  let b = []
  let s = []
  for ( let i = 0; i < id_edge.length; i++){
    let val = map.get(ar[i][0].node_a)
    val[ar[i][0].node_b]=start[i] 
    b.push(val)
    s.push(b[i][ar[i][0].node_b])
  }
  let map1 = new Map(JSON.parse(JSON.stringify(Array.from(map))))
  arrg.push(map1)
  while (JSON.stringify(s)!==JSON.stringify(end)) {
    for( let i =0; i < id_edge.length; i++) {
      if (b[i][ar[i][0].node_b] != end[i] ){
        b[i][ar[i][0].node_b]+=increment[i]
        s[i]+=increment[i]
      }
    }
  let map2 = new Map(JSON.parse(JSON.stringify(Array.from(map))))
  arrg.push(map2)
  }
  for(let y = 0; y < arrg.length; y++) {

    let route = new Graph1(Object.fromEntries(arrg[y]))
    arr.push(route.path(node_a, node_b, {cost: true}))

  }
  const min_cost = Math.min(...arr.map(o => o.cost))
  arr.push({"The best result costs: ": min_cost})
  
  const index = arr.findIndex((co) => co.cost === min_cost);
  arr.push({"The best result is obtained with the follow graph: ": Object.fromEntries(arrg[index])})
  

return arr
};

