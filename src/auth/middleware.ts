import authJwt from './auth-jwt';
import mid from './user-middleware';

export const authjwt = [
    authJwt.checkHeader,
    authJwt.checkPayloadHeader,
    authJwt.checkToken,
    authJwt.verifyKey,
    authJwt.logErrors,
    authJwt.errorHandler
];

export const UserExistance = [
    mid.checkUserExistence
];

export const GraphExistance = [
    mid.checkGraphExistence
];

export const EdgeExistance = [
    mid.checkEdgeExistance
];

export const Existance = [
    mid.checkUserExistence,
    mid.checkGraphExistence,
    mid.checkEdgeExistance
];



/*export const check = [
    mid.checkAuctionOpen,
    mid.checkEnglishAuction,
    mid.checkToken
];*/

export const user = [
    mid.checkUser
];

export const admin = [
    mid.checkAdmin
];
