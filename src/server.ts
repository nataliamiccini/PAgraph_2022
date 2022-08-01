import * as express from 'express';
const Graph = require('node-dijkstra')
import * as Service from './services/service'

const app = express();

app.use(express.json());
app.get('/all', function(req: any, res: any) {    
    Service.showALL( req, res);
});



const route = new Graph({
    'A': { 'B': 1 },
    'B': { 'A': 1, 'C': 2, 'D': 4 }
  })
  console.log(route)

const a = new Map()
a.set( 'A', { 'B': 1 })
console.log(a);



app.listen(8080 ,()=> console.log("Listening on port 8080"))