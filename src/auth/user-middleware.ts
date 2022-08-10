import * as Service from '../services/service-middleware'
import { resolveTripleslashReference } from 'typescript';

function checkUserExistence(req: any, res: any, next: any) {
    Service.checkUser(req.body.id_user, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "User not found"});
    });
};
function checkUserExistenceParam(req: any, res: any, next: any) {
    Service.checkUser(req.params['FKuser_id'], res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "User not found"});
    });
};
function checkCreatorExistence(req: any, res: any, next: any) {
    Service.checkCrator(req.body.user_id, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "User not found"});
    });
};

function checkGraphExistence(req: any, res: any, next: any) {
    Service.checkGraphExistance(req.body.id_graph, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "Graph not found"});
    });
};

function checkEdgeExistance(req: any, res: any, next: any) {
    (Service.checkEdgeExistance(req.body.id_edge, res)).then((check) => {
    (check) ? next() : res.status(500).json({"error": "Edge not found"});
    });
};

function checkTokenParam(req: any, res: any, next: any) : void {
    Service.checkToken(req.params['FKuser_id'], req.body.id_graph, res).then((check) => {
    (check) ? next() : res.status(500).json({"error": "Tokens not enough"});
    });
};
function checkToken(req: any, res: any, next: any) : void {
    Service.checkToken(req.body.id_user, req.body.id_graph, res).then((check) => {
    (check) ? next() : res.status(500).json({"error": "Tokens not enough"});
    });
};

function checkUser(req: any, res: any, next: any) : void {
    Service.checkRole(req.body.id_user, res).then((role) => {
    (role == 0) ? next() : res.status(500).json({"error": "You are not a user"});
    });
};

function checkAdmin(req: any, res: any, next: any) : void {
    Service.checkRole(req.body.id_user, res).then((role) => {
    (role == 1) ? next() : res.status(500).json({"error": "User not admin"});
    });
};


async function range(req:any,es: any): Promise<boolean>{
    let result: any
    if((req.body.start).filter(x => x>0).length < (req.body.start).length || (req.body.end).filter(x => x>0).length < (req.body.end).length 
        || (req.body.increment).filter(x => x>0).length < (req.body.increment).length 
        || JSON.stringify(req.body.start) === JSON.stringify(req.body.end)){
      result = false
    }
    else if ((req.body.start).every((element, index) => element < (req.body.end)[index])) {
        result = true
    }
   return result
  };

export default {
    checkUserExistence,
    checkUserExistenceParam,
    checkGraphExistence,
    checkEdgeExistance,
    checkToken,
    checkTokenParam,
    checkUser,
    range,
    checkCreatorExistence,
    checkAdmin
};