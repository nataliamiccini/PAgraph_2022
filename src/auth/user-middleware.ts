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
    Service.checkCreator(req.body.id_user, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "User not found"});
    });
};

function checkGraphExistence(req: any, res: any, next: any) {
    Service.checkGraphExistance(req.body.id_graph, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "Graph not found"});
    });
};

function checkEdgeExistance(req: any, res: any, next: any) {
    if(req.body.id_edge){
        (Service.checkEdgeExistance(req.body.id_edge, res)).then((check) => {
            (check) ? next() : res.status(500).json({"error": "Edge not found"});
        });
    } else next()
};

function checkToken(req: any, res: any, next: any) : void {
    Service.checkToken(req.params['FKuser_id'], req.body.id_graph, res).then((check) => {
    (check) ? next() : res.status(500).json({"error": "Tokens not enough"});
    });
};

function checkTokenCreate(req: any, res: any, next: any) : void {
    Service.checkTokenCreate(req.params['FKuser_id'], req.body, res).then((check) => {
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

function checkARange(req: any, res: any, next: any) : void {
    Service.Range(req.body.start,req.body.end,req.body.increment, res).then((check) => {
    (check) ? next() : res.status(500).json({"error": "Range not valid"});
    });
};

function checkZero(req: any, res: any, next: any) : void {
    Service.checkZero(req.body.id_user).then((check) => {
    (check) ? next() : res.status(401).json({"error": "Unauthorized"});
    });
};

function checkZeroParam(req: any, res: any, next: any) : void {
    Service.checkZero(req.params['FKuser_id']).then((check) => {
    (check) ? next() : res.status(401).json({"error": "Unauthorized"});
    });
};


export default {
    checkUserExistence,
    checkUserExistenceParam,
    checkGraphExistence,
    checkEdgeExistance,
    checkToken,
    checkTokenCreate,
    checkUser,
    checkARange,
    checkCreatorExistence,
    checkAdmin,
    checkZero,
    checkZeroParam
};