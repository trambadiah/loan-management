import { Request, Response, NextFunction } from 'express';
import appConfig from '../config/appConfig';
import { HttpException } from '../exceptions/HttpException';
import { handleError } from './errorHandler';


export const checkInternalAuth = async (req: Request, res: Response, next: NextFunction) => {
    let ex;
    const authHeader = req.headers.apikey;
    if (!authHeader) {
        ex = new HttpException(401, "AppKey Header not found", ['NG.EDOC.Header.Unauthorized']);

    } else {
        if (authHeader != appConfig.internalAPIKey) {
            ex = new HttpException(401, "AppKey is invalid!", ['NG.EDOC.Invalid.TokenType']);

        } else
            next();
    }
    if (ex)
        handleError(ex, req, res, next);
};
