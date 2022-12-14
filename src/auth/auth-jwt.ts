import * as jwt from "jsonwebtoken";
import logger from "jet-logger";
import { NextFunction, Request, Response } from "express";
import * as Server from '../services/service'


/**
 * Funzione checkToken
 * 
 * Verifica che sia presente un token jwt nella richiesta
 * 
 * @param req richiesta da parte dell'utente
 * @param res risposta da parte del sistema
 * @param next riferimento al middleware successivo
 */
 function checkToken(req: any, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    if( bearerHeader?.toLowerCase().startsWith("bearer ") ){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token=bearerToken;
        next();
     } else {
        res.status(403).json({"error": "No token provided"});
     }
  }
/**
 * Funzione checkPayloadHeader
 * 
 * Controlla che la richiesta abbia un Content-Type del tipo 'application/json'.
 * 
 * @param req richiesta da parte dell'utente
 * @param res risposta da parte del sistema
 * @param next riferimento al middleware successivo
 */
 export function checkPayloadHeader(req: any, res: any, next: any): void{
    (req.headers["content-type"] == 'application/json') ? next(): res.status(500).json({"error": "No Payload"});
}

/**
 * Funzione logErrors
 * 
 * Stampa l'errore
 * 
 * @param req richiesta da parte dell'utente
 * @param res risposta da parte del sistema
 * @param next riferimento al middleware successivo
 */
 function logErrors(err: Error, req: any, res: Response, next: NextFunction) {
    logger.err(err.stack);
    next(err);
  }

/**
 * Funzione errorHandler
 * 
 * Ritorna lo stato dell'errore
 * 
 * @param err errore 
 * @param req richiesta da parte dell'utente
 * @param res risposta da parte del sistema
 * @param next riferimento al middleware successivo
 */
function errorHandler(err: Error, req: any, res: Response, next: NextFunction) {
    res.status(500).send({"error": err.message});
}

/************************ JWT AUTHENTICATION *******************************/

/**
 * Funzione checkHeader 
 * 
 * Verifica che la richiesta contenga un Header
 * 
 * @param req richiesta da parte dell'utente
 * @param res risposta da parte del sistema
 * @param next riferimento al middleware successivo
 */
function checkHeader(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    (authHeader) ? next(): res.status(403).json({"error": "No authorization header"});
    
};


/**
 * Funzione verifyKey
 * 
 * Verifica che la chiave di autenticazione corrisponda
 * alla chiave segreta registrata tra le variabili d'ambiente.
 * 
 * @param req richiesta da parte dell'utente
 * @param res risposta da parte del sistema
 * @param next riferimento al middleware successivo
 */
 export function verifyKey(req: any, res: Response, next: NextFunction): void{
    try {
        logger.info(process.env.KEY);
  
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        const decoded: string | jwt.JwtPayload = jwt.verify(token, process.env.KEY)
 
        if (decoded != null) {
            req.body=decoded;
            next();
        }

    } catch (error) { 
        res.status(403).json({ "error": "invalid KEY" });
    }
}



/************************ MAYBE JWT AUTHENTICATION *******************************/
/**
 * Funzione checkHeader 
 * 
 * Verifica che la richiesta contenga un Header
 * 
 * @param req richiesta da parte dell'utente
 * @param res risposta da parte del sistema
 * @param next riferimento al middleware successivo
 */
 function checkHeader2(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    (authHeader) ? next(): Server.Request(req,res);
};


export default {
  checkPayloadHeader,
  checkToken,
  checkHeader,
  checkHeader2,
  verifyKey,
  logErrors,
  errorHandler
};