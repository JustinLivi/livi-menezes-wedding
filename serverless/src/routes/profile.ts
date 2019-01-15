import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { keys } from 'lodash';

import { dynamo, DYNAMODB_PROFILE_TABLE } from '../config';
import { log } from '../log';

export const profileRouter: RequestHandler = (
  { params: { userId } },
  res,
  next
) => {
  log.info({ userId }, 'fetching profile');
  dynamo.get(
    {
      Key: {
        id: userId
      },
      TableName: DYNAMODB_PROFILE_TABLE
    },
    (err, data) => {
      if (err) {
        return next(err);
      }
      if (keys(data).length === 0) {
        return next(createHttpError(404, 'Profile not found'));
      }
      log.debug({ data }, 'got profile');
      res.json(data.Item);
    }
  );
};
