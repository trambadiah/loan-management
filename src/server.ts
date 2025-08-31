require('dotenv').config();
import 'reflect-metadata';
const PORT = process.env.PORT || 3000;

import { createConnection } from 'typeorm';
createConnection()
  .then(() => {
    let App = require('./app').App;
    const app = new App();
    app.initialize();
    console.log(__dirname);
    app.defaultApp.listen(PORT, () => {
      console.log('Express server listening on port ' + PORT);
    });
  })
  .catch(error => console.log(error));
