import express = require('express');
import * as fileUpload from 'express-fileupload';
import helmet = require('helmet');
import cors = require('cors');

import actuator = require('express-actuator');
import Routes from './router/index';
import path = require('path');
import rfs = require("rotating-file-stream");
import morgan = require("morgan");
import { handleError } from './middleware/errorHandler';
// import { apiLogger } from './middleware/apiLogger';
export class App {
  public defaultApp: express.Application;
  public routes: Routes = new Routes();

  public initialize(): void {
    this.defaultApp = express();
    this.config();    
    this.setRouter();
    this.setHandlers();
  }

  private config(): void {
    // support application/json type post data
    this.defaultApp.use(express.json({ limit: '50mb' }));
    this.defaultApp.use(express.urlencoded({ extended: true, limit: '50mb' }));
    this.defaultApp.use(fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
    }));
    this.defaultApp.use(cors());
    this.defaultApp.use(helmet());
    this.defaultApp.use(actuator('/api/v1/businesspartner'));
    // this.defaultApp.use(apiLogger());
    this.defaultApp.use(handleError);
    

    // create a rotating write stream
    var accessLogStream = rfs.createStream('requests.log', {
      interval: '1d', // rotate daily
      path: path.join(__dirname, 'log')
    })


    // setup the logger
    this.defaultApp.use(morgan('combined', { stream: accessLogStream }));
  }

  private setRouter(): void {
    this.routes.v1Routes(this.defaultApp);
  }
  private setHandlers() {
    console.log('Handle error');
    this.defaultApp.use(handleError);

    process.on('uncaughtException', err => {
        console.log(`Uncaught Exception thrown: ${err}`);
    });
    process.on('unhandledRejection', err => {
      console.log(`Unhandled Rejection thrown: ${err}`);
    });
  }
}
