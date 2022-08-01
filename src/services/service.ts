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


export function test(req:any,res:any){
    let ar=[]
    let r: any;
     r =  sequelize.query(
         "SELECT node_a,node_b FROM graph WHERE id_graph=1",
       )
    

}