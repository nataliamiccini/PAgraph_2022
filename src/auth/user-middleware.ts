import * as Service from '../services/service-middleware'
import { resolveTripleslashReference } from 'typescript';

function checkUserExistence(req: any, res: any, next: any) {
    Service.checkUser(req.body.id_user, res).then((check) => {
    (check ) ? next() : res.status(500).json({"error": "User not found"});
    });
};

function checkCreatorExistence(req: any, res: any, next: any) {
    Service.checkCrator(req.body.FKuser_id, res).then((check) => {
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
    Service.checkRole(req.body.fkcreator_id, res).then((role) => {
    (role == 1) ? next() : res.status(500).json({"error": "User not admin"});
    });
};


export default {
    checkUserExistence,
    checkGraphExistence,
    checkEdgeExistance,
    checkToken,
    checkUser,
    checkCreatorExistence,
    checkAdmin
};