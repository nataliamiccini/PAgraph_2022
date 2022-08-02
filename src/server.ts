import * as express from 'express';
const Graph = require('node-dijkstra')
import * as Service from './services/service'

const app = express();

app.use(express.json());
app.get('/all', function(req: any, res: any) {    
    Service.showALL( req, res);
});
app.get('/test', function(req: any, res: any) {    
    Service.test(req.body.id_graph, res);
});

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.post('/createGraph',function(req: any, res: any) { 
    const route = new Graph(req.body) 
    console.log(route)
    Service.createGraph(req.body,res);
    res.json("Grafo creato")

});

const a = new Map()
a.set( 'A', { 'B': 1 })
console.log(a);



app.listen(8080 ,()=> console.log("Listening on port 8080"))