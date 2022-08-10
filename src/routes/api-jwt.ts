import * as Service from '../services/service';
import { Router } from 'express';
import * as middleware from '../auth/middleware';

const apiRouterJWT= Router();

apiRouterJWT.post('/charging', middleware.NoPayloadjwt,middleware.admin, async function(req: any, res: any){
    await Service.chargingAdmin(req.body.mail, req.body.token, res)
});

apiRouterJWT.get('/update/:FKuser_id', middleware.CheckPayload,middleware.UserExistanceParam, middleware.EdgeExistance, middleware.jwtReq, function(req: any, res: any) {    
    let id=[];
    let request=req.body.id_edge;
    for (var key in request) {
      if (request.hasOwnProperty(key)) {
        id.push(request[key]);
      }
    }
      Service.updateWeight(req.body.new_weight, id, res);
      res.json("Il modello è stato aggiornato")
   
  });
export default apiRouterJWT;