import pg from './database';

const config = {
  db: {},
  port: parseInt(process.env.PORT || '8000'),
  host: process.env.HOST || 'localhost'
};

if (process.env.NODE_ENV !== "production") {
  const dotenv: any = require("dotenv");
  dotenv.config();
}

if (process.env.PG_CONNECTION_STRING) {
  config.db = pg(process.env.PG_CONNECTION_STRING);
} else {
  throw new Error(`Missing Env : [PG_CONNECTION_STRING]`);
}

export default config;
