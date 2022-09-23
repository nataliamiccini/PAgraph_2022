import * as Service from '../services/service';
import { Router } from 'express';
import * as middleware from '../auth/middleware';
import { SuccessEnum, getObj } from '../factory/Success';
import { User } from '../models/user-model';

const apiRouter= Router();


apiRouter.get('/sim-seq', middleware.EdgeExistance, middleware.Checkrange, async function(req: any, res: any) {    
    Service.simulationSeq(req.body.id_edge, req.body.start, req.body.end, req.body.increment, req.body.node_a, req.body.node_b, res).then( result => {
       res.json(result)
    })
});

apiRouter.get('/sim-par', middleware.EdgeExistance, middleware.Checkrange, async function(req: any, res: any) {    
    Service.SimulationPar(req.body.id_edge, req.body.start, req.body.end, req.body.increment, req.body.node_a, req.body.node_b, res).then( result => {
        res.json(result)
    })
});


apiRouter.get('/filter', function(req: any, res: any) {    
    Service.filterGraph(req.body.num_nodi, req.body.num_archi, res).then( result => {
        res.json(result[0])
    })
});

apiRouter.get('/versionsList', middleware.EdgeExistance, middleware.GraphExistance, function(req: any, res: any) {    
    Service.VersionsList(req.body.date, req.body.id_edge, req.body.id_graph, res).then( result => {
        res.json(result)
    })
});

apiRouter.get('/modelList', middleware.EdgeExistance, function(req: any, res: any) {    
    Service.ModelList(req.body.date, req.body.id_edge, res).then( result => {
      res.json(result[0])
    })
});

apiRouter.get('/path/:FKuser_id',middleware.CheckZeroParam, middleware.GraphParam, middleware.Token, async function(req: any, res: any) {  
    Service.path(req.body.id_graph, req.body.versions, req.body.node_a, req.body.node_b, req.params['FKuser_id'], res).then( result => {
      res.json(result)
    })
});

apiRouter.get('/rejectReq', middleware.UserExistance, middleware.CheckZero, middleware.creator,function(req: any, res: any) { 
    Service.Reject(req.body.request_id,res)
});



apiRouter.get('/ShowRequest', middleware.UserExistance, middleware.CheckZero, middleware.creator, function(req: any, res: any) {    
    Service.ShowReq(res);
});

apiRouter.get('/AcceptReq', middleware.UserExistance, middleware.CheckZero, middleware.creator,function(req: any, res: any) {    
    Service.Accept(req.body.request_id, res);
});

apiRouter.post('/createGraph/:FKuser_id', middleware.GraphCreate, middleware.CheckZeroParam, middleware.TokenCreate, async function(req: any, res: any) { 
    await Service.createTableGraph(req.body, req.params['FKuser_id'],res).then( result => {
        
        User.decrement({token: result}, {where: {id_user: req.params['FKuser_id']}}).then( arr1 => {
            const new_res = getObj(SuccessEnum.CreatedGraph).getObj();  
            res.status(new_res.status).json({message:new_res.msg,'hai perso token':result});
        })
        
    })
});



export default apiRouter;
