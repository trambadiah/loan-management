import {
  Application as ExpressApp,
  Router,
  Request,
  Response,
} from 'express';
import { flatMap } from 'lodash';
import WebRoutesV1 from './v1/index';
import { checkJWT, checkJWTOptional } from '../middleware/checkJWT';
import { version } from '../../package.json';
import { customRateLimit, rateLimitMiddleware } from '../middleware/rateLimit';
import { checkInternalAuth } from '../middleware/checkInernalAuth';
import validationMiddleware from '../middleware/validationMiddleware';
import { checkRole } from '../middleware/checkUserRole';
import { AppResponse } from '../utils/AppResponse';

export default class Routes {

  public v1Routes(app: ExpressApp): void {

    let webRouter = this.getRoutes(WebRoutesV1);
    webRouter.get('/info', function (req, res) {
      res.send('Running on Version:' + version);
    });

    app.use('/api/v1', webRouter);

  }

  getRoutes(routes: object) {
    const router: Router = Router();
    flatMap(Object.entries(routes), routeBuilder => {
      const routeBasePath = routeBuilder[0];
      const routeData = routeBuilder[1];

      return routeData.map(route => ({
        ...route,
        path: `/${routeBasePath}${route.path}`,
      }));
    }).forEach(route => {
      const middlewares = [];

      if (route.requiresAuth || route.roles) {
        middlewares.push(checkJWT);
      } 
      if (route.internalRoute) {
        middlewares.push(checkInternalAuth);
      }
      
      if (route.roles) {
        middlewares.push(checkRole(route.roles));
      }


      if (route.validationConfig) {
        middlewares.push(validationMiddleware(route.validationConfig));
      }

      if (route.rateLimitConfig) {
        middlewares.push(customRateLimit(route.rateLimitConfig));
      } else if(!route.internalRoute){
        middlewares.push(rateLimitMiddleware);
      }


      if (middlewares && middlewares.length)
        router[route.method](route.path, middlewares, async (req: Request, res: Response, next: Function) => {
          try {
            let response = await (new (route.controller as any)(res.locals.context))[route.action](req, res);
            res.locals.response = response;
            if (response.codes)
              res.send(response);
            else
              res.send(AppResponse.send(200, true, response));
          } catch (ex) {
            next(ex);
          }
        });
      else
        router[route.method](route.path, async (req: Request, res: Response, next: Function) => {
          try {
            let response = await (new (route.controller as any)(res.locals.context))[route.action](req, res);
            res.locals.response = response;
            if (response.codes)
              res.send(response);
            else
              res.send(AppResponse.send(200, true, response));
          } catch (ex) {
            next(ex);
          }
        });
    });
    return router;
  }

}