import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
// import { JWTTokenDataModel } from '../model/CommonModels';
// import { AuthService } from '../service/core/AuthenticationService';
import { AppResponse } from '../utils/AppResponse';
import { handleError } from './errorHandler';

export const checkJWT = async (req: Request, res: Response, next: NextFunction) => {

    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //     handleError(new HttpException(401, "Authorization Header not found", ['UK.EDOC.BusinessPartner.Header.Unauthorized']), req, res, next);
    // } else {
    //     let token;
    //     if (authHeader.startsWith("Bearer ")) {
    //         token = authHeader.substring(7, authHeader.length);
    //     } else
    //         handleError(new HttpException(401, "Token type is invalid!", ['UK.EDOC.BusinessPartner.Invalid.TokenType']), req, res, next);
    //     try {
    //         let userData = await AuthService.verifyJWTToken<JWTTokenDataModel>(token);
    //         res.locals.businessPartner = userData;
    //         next();
    //     } catch (ex) {
    //         handleError(new HttpException(401, "Token type is invalid!", ['UK.EDOC.BusinessPartner.Invalid.TokenType']), req, res, next);

    //     }
    // }
};

export const checkJWTOptional = async (req: Request, res: Response, next: NextFunction) => {

    // const authHeader = req.headers.authorization;
    // if (authHeader) {
    //     let token;
    //     if (authHeader.startsWith("Bearer ")) {
    //         token = authHeader.substring(7, authHeader.length);
    //         try {
    //             let userData = await AuthService.verifyJWTToken<JWTTokenDataModel>(token);
    //             res.locals.businessPartner = userData;
    //             next();
    //         } catch (ex) {
    //             next();
    //         }
    //     } else
    //         next();
    // }
    // next();
};
