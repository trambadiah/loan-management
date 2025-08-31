import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";
import { AppResponse } from "../utils/AppResponse";


export const handleError = (error: HttpException, req: Request, res: Response, next: NextFunction) => {

    try {
        res.locals.error = { message: error.message, stack: error.stack, status: error.status };
        if (error instanceof HttpException) {
            const status: number = error.status || 500;
            const message: string = error.message || "Internal Server Error";
            const data: any = error.data || ['NG.EDOC.BusinessPartner.Error'];

            res.status(status).send(AppResponse.send(status, message, data))
        } else {
            res.status(500).send(AppResponse.send(500, 'Internal Server Error', ['NG.EDOC.BusinessPartner.Error']))
        }
    } catch (error) {
        next(error);
    }
}