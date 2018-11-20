import express from 'express';
import bodyParser from 'body-parser';
import {
  attachControllers,
} from '@decorators/express';

import config from './config';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const controllers: any[] = [];
const normalizedPath = require("path").join(__dirname, "controllers");

require("fs").readdirSync(normalizedPath).forEach(function (file: string) {
  if (file.indexOf('base') === -1)
    controllers.push(require("./controllers/" + file).default);
});

attachControllers(app, controllers);

app.listen(config.port, config.host, () => {
  console.log(`Yerevan is listening on port http://${config.host}:${config.port}!`);
});
