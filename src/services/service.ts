import { Graph } from '../models/graph-model';
import { Model, Sequelize, where } from 'sequelize';
import { Singleton } from '../connection/Singleton';

const sequelize: Sequelize = Singleton.getConnection();

export function showALL(req: any, res: any) {
    Graph.findAll({}).then(arr=>{
        console.log(arr);
        res.json(arr);
    });
};

let r: any;

export function test(id_graph:number,res:any){
    let elem=[];
    Graph.findAll({attributes: ['node_a'],where:{id_graph: id_graph}}).then(arr=>{
        res.json(arr);
    });
}


export function createGraph(req:any,res:any){
let costo=[];
let nodi_esterni=[];
let nodi_interni=[];
let keys;
let val;


   keys = Object.keys(req);
   val = Object.values(req);

   Object.getOwnPropertyNames(req).forEach(
    function (val1) {
    nodi_esterni.push(val1);
  });


   for(var i in nodi_esterni){
    nodi_interni=[];
    costo=[];
    createGraph(req[keys[i]],res)
    
    if((Object.getOwnPropertyNames(req[keys[i]])).length !==0){
      Object.getOwnPropertyNames(req[keys[i]]).forEach(
        function (x) {
          nodi_interni.push(Object.values(x));
        });

        Object.values(req[keys[i]]).forEach(
          function (y) {
            costo.push(y)
          });

          
    }     
      if(nodi_interni.length!==0) 
       { console.log(i + " ESTERNO "+ nodi_esterni[i])

      for(let z in nodi_interni){
        console.log(i +" INTERNO "+ nodi_interni[z]);
        console.log(i+ " costo "+ costo[z]);
        var ID = Math.random().toString(36);
        
           Graph.create({id_edge:ID,id_graph:11,node_a:nodi_esterni[i],node_b:String(nodi_interni[z]),weight_edge:costo[z],modify_date:"2022-07-31T15:40:00+01:00",FKuser_id:"Wos78BnB09"}).then((arr)=>{
          
      console.log("fatto");
    })
        
        }
        }
      
      }
   
  } 
