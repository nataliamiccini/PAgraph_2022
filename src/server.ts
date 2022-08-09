import * as express from 'express';
const Graph = require('node-dijkstra')
import * as Service from './services/service'
import {Req} from './services/request'
import {MapValue} from './services/map'
import { forEachTrailingCommentRange } from 'typescript';
import { Request } from "express"
import * as middleware from './auth/middleware';
const app = express();

app.use(express.json());

let map= new MapValue<Req<number,string[],string>>();

app.post('/createGraph/:FKuser_id',middleware.Graph,middleware.Token,function(req: any, res: any) { 

    Service.createTableGraph(req.body, req.params['FKuser_id'],res);
    Service.updateE();
    Service.updateN(req.body,req.params['FKuser_id'],res);
});

app.get('/update', middleware.Graph,middleware.EdgeExistance,middleware.jwtReq,function(req: any, res: any) {    
  let x = JSON.stringify(map);
  let y = JSON.parse(x);

  for (let key in y) {
    if (y.hasOwnProperty(key)) {
      let z=y[key];
      let l=Object.values(z);
      l.forEach(function(x){
       if (x["request_id"]===req.body.request_id) 
        {res.json("é stata accettata la richiesta: "+req.body.request_id);
        Service.updateWeight(x["weight"], x["edge_id"], res);
        let index= l.indexOf(x);
        map.pop(index);
      }
            
      })
    }
  }
    
});

export function Request(req: any, res: any) {  
  let x = new Req<number,string[],string>();
  let s4 = Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

  x.SetValue(s4 ,req.body.new_weight, req.body.id_edge);
  map.pushI(x);

  res.json("la richiesta è stata aggiunta");
};


app.get('/ShowRequest', middleware.creator,function(req: any, res: any) {    
  res.json(map);
});

app.get('/AcceptReq', middleware.creator,function(req: any, res: any) {    
  let x = JSON.stringify(map);
  let y = JSON.parse(x);

  for (let key in y) {
    if (y.hasOwnProperty(key)) {
      let z=y[key];
      let l=Object.values(z);
      l.forEach(function(x){
       if (x["request_id"]===req.body.request_id) 
        {res.json("é stata accettata la richiesta: "+req.body.request_id);
        Service.updateWeight(x["weight"], x["edge_id"], res);
        let index= l.indexOf(x);
        map.pop(index);
      }
            
      })
    }
  }
});

app.get('/rejectReq', middleware.creator,function(req: any, res: any) { 

  let x = JSON.stringify(map);
  let y = JSON.parse(x);

  for (let key in y) {
    if (y.hasOwnProperty(key)) {
      let z=y[key];
      let l=Object.values(z);
      l.forEach(function(x){
       if (x["request_id"]===req.body.request_id) 
        {res.json("é stata eliminata la richiesta: "+req.body.request_id);
        let index= l.indexOf(x);
        map.pop(index);}
            
      })
    }
  }
});

app.get('/path', middleware.Graph, async function(req: any, res: any) {    
  await Service.path(req.body.id_graph, req.body.node_a, req.body.node_b, req.body.user_id, res).then( result => {
    res.json(result)
  })
});

app.get('/path-v', middleware.Graph,async function(req: any, res: any) {    
  await Service.pathV(req.body.id_graph, req.body.version, req.body.node_a, req.body.node_b, req.body.user_id, res).then( result => {
    res.json(result)
  })
});

app.get('/versionsList', middleware.EdgeExistance,middleware.GraphExistance, function(req: any, res: any) {    
  Service.VersionsList(req.body.date,req.body.id_edge,req.body.FKid_graph, res).then( result => {
    res.json(result)
  })
  
});

app.get('/modelList', middleware.EdgeExistance, function(req: any, res: any) {    
  Service.ModelList(req.body.date,req.body.id_edge, res).then( result => {
    res.json(result)
  })
  
});



app.get('/nodi', function(req: any, res: any) {    
    Service.n_nodi(req.body.id_graph, res).then(r=>{
      res.json(r)
    })
    
});

app.get('/filter', async function(req: any, res: any) {    
  await Service.filterGraph(req.body.num_nodi, req.body.num_archi, res).then( result => {
    res.json(result)
  })
});

app.get('/nodi', async function(req: any, res: any) {    
    await Service.cost(req.body.id_graph, res).then( result => {
      res.json(result)
    })
  });



app.listen(8080 ,()=> console.log("Listening on port 8080"))