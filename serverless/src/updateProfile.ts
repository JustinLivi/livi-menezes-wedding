import { AWSError } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import createHttpError from 'http-errors';
import { keys } from 'lodash';

import { dynamo, DYNAMODB_PROFILE_TABLE } from './config';
import { log } from './log';

export const updateProfile = ({
  userId,
  ExpressionAttributeValues,
  UpdateExpression
}: {
  userId: string;
  ExpressionAttributeValues: DocumentClient.ExpressionAttributeValueMap;
  UpdateExpression: string;
}) =>
  new Promise((resolve, reject) => {
    dynamo.update(
      {
        ConditionExpression: 'attribute_exists(id)',
        ExpressionAttributeValues,
        Key: {
          id: userId
        },
        ReturnValues: 'ALL_NEW',
        TableName: DYNAMODB_PROFILE_TABLE,
        UpdateExpression
      },
      (err: AWSError, data: DocumentClient.UpdateItemOutput) => {
        if (err) {
          return reject(err);
        }
        if (keys(data).length === 0) {
          return reject(createHttpError(404, 'Profile not found'));
        }
        log.debug({ data }, 'got profile');
        resolve();
      }
    );
  });
