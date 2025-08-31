import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { handleError } from './errorHandler';
// import { JWTTokenDataModel } from '../model/CommonModels';
// import { UserRole } from '../utils/AppConstants';


export const checkRole = (roles) => {
  // return async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // return a middleware
  //     const userRoles = roles;
  //     const user = res.locals.businessPartner as JWTTokenDataModel;

  //     if (user && (userRoles.find(r => r == user.userRole) != undefined)) {
  //       next(); // role is allowed, so continue on the next middleware
  //     } else {
  //       throw new HttpException(401, "Role is invalid!", ['NG.EDOC.Invalid.TokenType']);
  //     }
  //   } catch (ex) {
  //     handleError(ex, req, res, next);
  //   }
  // };
}
