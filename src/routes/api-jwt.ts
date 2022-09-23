import * as Service from '../services/service';
import { Router } from 'express';
import * as middleware from '../auth/middleware';
import { SuccessEnum, getObj } from '../factory/Success';

const apiRouterJWT= Router();

apiRouterJWT.post('/charging', middleware.CheckZero, middleware.NoPayloadjwt, middleware.admin, async function(req: any, res: any){
    await Service.chargingAdmin(req.body.mail, req.body.token, res).then(() => {
      const new_res = getObj(SuccessEnum.chargingAdmin).getObj();
      res.status(new_res.status).json({message:new_res.msg + req.body.token});
  }).catch((error) => {
      res.json('Error')
  });
});

apiRouterJWT.get('/update/:FKuser_id',  middleware.UserExistanceParam, middleware.CheckZeroParam, middleware.jwtReq, middleware.CheckPayload, middleware.EdgeExistance, function(req: any, res: any) {    
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
