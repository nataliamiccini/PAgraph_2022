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

export const TokenCreate = [
    mid.checkTokenCreate
];

export const GraphParam=[
    authJwt.checkPayloadHeader,
    mid.checkUserExistenceParam,
    mid.checkGraphExistence  
];

export const GraphCreate=[
    authJwt.checkPayloadHeader,
    mid.checkUserExistenceParam 
];

export const UserExistance = [
    mid.checkUserExistence
];

export const UserExistanceParam = [
    mid.checkUserExistenceParam
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
];

export const CheckPayload=[
    authJwt.checkPayloadHeader,
];

export const CheckZero=[
    mid.checkZero,
];

export const CheckZeroParam=[
    mid.checkZeroParam,
];