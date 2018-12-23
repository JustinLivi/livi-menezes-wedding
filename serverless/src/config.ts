import aws from 'aws-sdk';
import * as yup from 'yup';

export type EnvVars =
  | 'REGION'
  | 'DYNAMODB_API_VERSION'
  | 'DYNAMODB_PROFILE_TABLE';

export const envDefaults = {
  DYNAMODB_API_VERSION: '2012-10-08',
  PORT: 3000,
  REGION: 'us-east-1'
};

const schema = yup.object({
  DYNAMODB_API_VERSION: yup
    .string()
    .required()
    .default(envDefaults.DYNAMODB_API_VERSION),
  DYNAMODB_PROFILE_TABLE: yup.string().required(),
  REGION: yup
    .string()
    .required()
    .default(envDefaults.REGION)
});

export const {
  REGION,
  DYNAMODB_API_VERSION,
  DYNAMODB_PROFILE_TABLE
} = schema.validateSync(schema.cast(process.env));

aws.config.update({ region: REGION });

export const dynamo = new aws.DynamoDB({ apiVersion: DYNAMODB_API_VERSION });
