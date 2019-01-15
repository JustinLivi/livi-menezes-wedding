import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { keys } from 'lodash';
import * as yup from 'yup';

import { RsvpPayload } from '../../../client/src/common';
import { dynamo, DYNAMODB_PROFILE_TABLE } from '../config';
import { log } from '../log';

const schema = yup.object({
  rsvp: yup.boolean().required(),
  userId: yup.string().required()
});

export const rsvpCeremonyRouter: RequestHandler = async (
  { body }: { body: RsvpPayload },
  res,
  next
) => {
  try {
    await schema.validate(body);
  } catch (err) {
    next(createHttpError(400, err));
  }
  log.info({ body }, 'rsvping to ceremony');
  const { userId, rsvp } = body;
  dynamo.update(
    {
      ConditionExpression: 'attribute_exists(id)',
      ExpressionAttributeValues: {
        ':rsvp': rsvp
      },
      Key: {
        id: userId
      },
      ReturnValues: 'ALL_NEW',
      TableName: DYNAMODB_PROFILE_TABLE,
      UpdateExpression: 'SET attendingWedding = :rsvp'
    },
    (err, data) => {
      if (err) {
        return next(err);
      }
      if (keys(data).length === 0) {
        return next(createHttpError(404, 'Profile not found'));
      }
      log.debug({ data }, 'got profile');
      res.json({ success: true });
    }
  );
};
