import aws from 'aws-sdk';
import * as yup from 'yup';

export type EnvVars =
  | 'REGION'
  | 'DYNAMODB_API_VERSION'
  | 'DYNAMODB_PROFILE_TABLE'
  | 'DYNAMODB_ENDPOINT'
  | 'IS_OFFLINE';

export const envDefaults = {
  DYNAMODB_API_VERSION: '2012-08-10',
  DYNAMODB_ENDPOINT: 'http://localhost:8000',
  DYNAMODB_PROFILE_TABLE: 'profiles',
  REGION: 'localhost'
};

const schema = yup.object({
  DYNAMODB_API_VERSION: yup
    .string()
    .required()
    .default(envDefaults.DYNAMODB_API_VERSION),
  DYNAMODB_ENDPOINT: yup
    .string()
    .required()
    .default(envDefaults.DYNAMODB_ENDPOINT),
  DYNAMODB_PROFILE_TABLE: yup
    .string()
    .required()
    .default(envDefaults.DYNAMODB_PROFILE_TABLE),
  REGION: yup
    .string()
    .required()
    .default(envDefaults.REGION)
});

export const {
  REGION,
  DYNAMODB_API_VERSION,
  DYNAMODB_ENDPOINT,
  DYNAMODB_PROFILE_TABLE
} = schema.validateSync(schema.cast(process.env));

aws.config.update({ region: REGION });

export const dynamo = new aws.DynamoDB.DocumentClient({
  apiVersion: DYNAMODB_API_VERSION,
  endpoint: DYNAMODB_ENDPOINT,
  region: REGION
});
