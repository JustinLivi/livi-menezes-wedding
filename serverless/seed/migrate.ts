// tslint:disable:no-implicit-dependencies
import AWS from 'aws-sdk';
import { executeAll, init } from 'dynamodb-migrations';
import * as path from 'path';

const options = {
  endpoint: 'http://localhost:8000',
  region: 'localhost'
};
const dynamodb = {
  doc: new AWS.DynamoDB.DocumentClient(options),
  raw: new AWS.DynamoDB(options)
};
init(dynamodb, path.resolve(__dirname, './migrations'));
executeAll({});
