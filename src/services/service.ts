import { User } from '../models/user-model';
import { Graph } from '../models/graph-model';
import { Model, Sequelize, where,QueryTypes } from 'sequelize';
import { Singleton } from '../connection/Singleton';

const sequelize: Sequelize = Singleton.getConnection();

export function showALL(req: any, res: any) {
    Graph.findAll({}).then(arr=>{
        console.log(arr);
        res.json(arr);
    });
};


export function test(id_graph:number,res:any){
    let elem=[];
    Graph.findAll({attributes: ['node_a'],where:{id_graph: id_graph}}).then(arr=>{
        res.json(arr);
    });
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
          
        });

      Object.values(req[keys[i]]).forEach(
        function (y) {
          costo.push(y)
        });
          //tot_i.push(Object.getOwnPropertyNames(req[keys[i]]))
    }     
      if(nodi_interni.length!==0) {
        //console.log(i + " ESTERNO "+ nodi_esterni[i])


        //console.log("totale "+ tot)
        for(let z in nodi_interni){
            //console.log(i +" INTERNO "+ nodi_interni[z]);
            //console.log(i+ " costo "+ costo[z]);
            

            let ID = Math.random().toString(36);

            sequelize.query(
              "SELECT MAX(id_graph) as max FROM graph",
              {raw:true,
                type:QueryTypes.SELECT}
            ).then(arr=>{
              //console.log(arr.map(item=>(item as any).max)[0])
              max= arr.map(item=>(item as any).max)[0];
             });
             
             tot_c.push(costo[z]);
             n_archi=tot_c.length;
            
             n_interni=tot_i.length;
             //if((tot_i.indexOf(nodi_interni[z]))== -1) tot_i.push(nodi_interni[z]);
             tot_e.add(nodi_interni[z])
             

            Graph.create({id_edge:ID,id_graph:max+2,node_a:nodi_esterni[i],node_b:String(nodi_interni[z]),weight_edge:costo[z],modify_date:"2022-07-31T15:40:00+01:00",FKuser_id:"Wos78BnB09"}).then((arr)=>{
                //console.log("fatto");
                
            });
        //if((tot_e.indexOf()&&tot_e.indexOf(nodi_esterni[i]))== -1) tot_e.push(nodi_esterni[i]);
          } 
        
        }        

      }

      tot_e.add(nodi_esterni)
      n_esterni=tot_e.size;
      //n_interni=tot_i.length;
      //console.log("tot_i "+ tot_i)
      //console.log("esterni  "+ tot_e)
      //console.log("esterni "+n_esterni+"interni "+n_interni+"archi "+n_archi)
return tot=0.25*n_esterni+ 0.01*n_archi;

     /*User.decrement({token:tot},{where:{id_user:"Wos78BnB09"}}).then(arr=>{
        //console.log("Hai pagato un totale di  "+ 0.25*(n_esterni+n_interni) + "token");
        res.json("Hai pagato un totale di  "+ tot + "token")
         });*/

   
  } 

  export function endGraph(req:any,res:any){
      let x= createGraph(req,res)
      console.log("totale costo "+x)
      User.decrement({token:x},{where:{id_user:"Wos78BnB09"}}).then(arr=>{
        //console.log("Hai pagato un totale di  "+ 0.25*(n_esterni+n_interni) + "token");
        res.json("Hai pagato un totale di  "+ x + "token")
      //.then((arr)=>{
      });
      //})
  }