import authJwt from './auth-jwt';
import mid from './user-middleware';

export const authjwt = [
    authJwt.checkHeader,
    authJwt.checkPayloadHeader,
    authJwt.verifyKey,
    authJwt.logErrors,
    authJwt.errorHandler
];

export const NoPayloadjwt = [
    authJwt.checkHeader,
    authJwt.verifyKey,
    authJwt.logErrors,
    authJwt.errorHandler
];

export const jwtReq=[
    authJwt.checkHeader2,
    authJwt.verifyKey,
    authJwt.logErrors,
    authJwt.errorHandler

];

export const Token = [
    mid.checkToken
];

export const TokenParam = [
    mid.checkTokenParam
];

export const GraphParam=[
    authJwt.checkPayloadHeader,
    mid.checkUserExistenceParam,
    mid.checkGraphExistence
    
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

export const user = [
    mid.checkUser
];

export const admin = [
    mid.checkAdmin
];

export const creator = [
    mid.checkCreatorExistence
];

export const Checkrange=[
    mid.checkARange
]