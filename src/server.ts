import * as express from 'express';
const Graph = require('node-dijkstra')
import * as Service from './services/service'
import {Req} from './services/request'
import {MapValue} from './services/map'
import { forEachTrailingCommentRange } from 'typescript';
const app = express();

app.use(express.json());
let id=[];
let map= new MapValue<Req<number,string[],string>>();

app.get('/RequestUpdate', function(req: any, res: any) {  
  let x = new Req<number,string[],string>();
  let s4 = Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

  //x.SetValue(map.Lenght()+1,req.body.new_weight, req.body.id_edge);
  x.SetValue(s4 ,req.body.new_weight, req.body.id_edge);
  //id.push(map.Lenght())
  console.log(id)
  map.pushI(x);

  res.json("la richiesta è stata aggiunta");
});


app.get('/ShowRequest', function(req: any, res: any) {    
  res.json(map);
});


app.get('/all', function(req: any, res: any) {    
  Service.showAllGraph( req, res);
});

app.get('/rejectReq', function(req: any, res: any) { 

  let x = JSON.stringify(map)
  let y = JSON.parse(x)

  for (let key in y) {
    if (y.hasOwnProperty(key)) {
      let z=y[key];
      let l = z[0];
      if(l["request_id"]===req.body.id){
        map.pop();
        res.json("é stata eliminata la richiesta: "+req.body.id);
        }
        else{
          res.json("Id "+req.body.id+ " non valido");
        }
    }
  }
});


app.get('/update', function(req: any, res: any) {    
    Service.updateWeight(req.body.new_weight, req.body.id_edge, res);
    
});

app.get('/nodi', function(req: any, res: any) {    
    Service.nodi(req.body.id_edge, res);
    
});

app.post('/createGraph',function(req: any, res: any) { 
    const route = new Graph(req.body) 
    console.log(route)
    Service.endGraph(req.body,res)

});

app.get('/nodi', async function(req: any, res: any) {    
    await Service.cost(req.body.id_graph, res).then( result => {
      res.json(result)
    })
  });

app.get('/path', async function(req: any, res: any) {    
  await Service.path(req.body.id_graph, req.body.node_a, req.body.node_b, req.body.user_id, res).then( result => {
    res.json(result)
  })
});

app.get('/path-v', async function(req: any, res: any) {    
  await Service.pathV(req.body.id_graph, req.body.version, req.body.node_a, req.body.node_b, req.body.user_id, res).then( result => {
    res.json(result)
  })
});

app.listen(8080 ,()=> console.log("Listening on port 8080"))