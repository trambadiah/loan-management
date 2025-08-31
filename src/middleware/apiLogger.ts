// import { Request, Response, NextFunction } from "express";
// import { v4 as uuidv4 } from 'uuid';
// import { handleError } from "./errorHandler";
// import { APILogModel, APILogService } from "../service/core/APILogService";
// import { ContextModel } from "../model/CommonModels";
// import { differenceInMilliseconds } from "date-fns";

// var onFinished = require('on-finished')

// export const apiLogger = () => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         const context: ContextModel = {
//             correlationId: req.headers['correlation-id'] as string || uuidv4(),
//             journeyType: req.headers['journey-type'] as string || '',
//             appName: req.headers['app-name'] as string || '',
//             appVersion: req.headers['app-version'] as string || '' 
//         }
//         res.locals.context = context;
//         const startTime = new Date();
//         try {
//             const apiLog: APILogModel = {
//                 apiUrl: req.originalUrl || req.url,
//                 method: req.method,
//                 requestBody: JSON.stringify({
//                     params: req.params,
//                     query: req.query,
//                     body: req.body
//                 }),
//                 clientId: req.headers['client-id'] as string,
//                 responseBody: null,
//                 statusCode: 0,
//                 authorization: req.headers.authorization,
//                 requestIP: req.ip ||
//                     (req.connection && req.connection.remoteAddress),
//                 context,
//                 callDuration: 0
//             }

//             const logRequest = (err, res) => {
//                 apiLog.statusCode = res.statusCode;
//                 apiLog.responseBody = JSON.stringify(res.locals);
//                 const endTime = new Date();
//                 apiLog.callDuration = differenceInMilliseconds(endTime, startTime);
//                 APILogService.addLog(apiLog);
//             }

//             onFinished(res, logRequest);
//             next();
//         } catch (ex) {
//             handleError(ex, req, res, next);
//         }
//     };
// }
