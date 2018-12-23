import { RequestHandler } from 'express';
import { dynamo, DYNAMODB_PROFILE_TABLE } from '../config';
import { log } from '../log';

export const profileRouter: RequestHandler = (
  { params: { profileId } },
  res,
  next
) => {
  log.info({ profileId }, `fetching profile`);
  dynamo.getItem(
    {
      Key: {
        id: { S: profileId }
      },
      TableName: DYNAMODB_PROFILE_TABLE
    },
    (err, data) => {
      if (err) {
        return next(err);
      }
      res.json(data);
    }
  );
};
