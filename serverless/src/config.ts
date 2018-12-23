import { ConnectionConfig } from 'pg';
import * as yup from 'yup';

export enum EnvVars {
  PORT = 'PORT',
  DB_USER = 'DB_USER',
  DB_HOST = 'DB_HOST',
  DB_DATABASE = 'DB_DATABASE',
  DB_PORT = 'DB_PORT'
}

const schema = yup.object({
  [EnvVars.PORT]: yup
    .number()
    .required()
    .default(3000),
  [EnvVars.DB_DATABASE]: yup
    .string()
    .required()
    .default('bank'),
  [EnvVars.DB_HOST]: yup
    .string()
    .required()
    .default('db'),
  [EnvVars.DB_PORT]: yup
    .number()
    .required()
    .default(26257),
  [EnvVars.DB_USER]: yup
    .string()
    .required()
    .default('maxroach')
});

export const {
  PORT,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  DB_USER
} = schema.validateSync(schema.cast(process.env));
export const DB_CONFIG: ConnectionConfig = {
  database: DB_DATABASE,
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER
};
