import * as express from 'express';
const Graph = require('node-dijkstra')
import * as Service from './services/service'

const app = express();

app.use(express.json());

app.get('/all', function(req: any, res: any) {    
    Service.showAllGraph( req, res);
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