import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import * as yup from 'yup';

import { RsvpPayload } from '../../../client/src/common';
import { log } from '../log';
import { updateProfile } from '../updateProfile';

const schema = yup.object({
  rsvp: yup.boolean().required(),
  userId: yup.string().required()
});

export const rsvpRehearsalRouter: RequestHandler = async (
  { body }: { body: RsvpPayload },
  res,
  next
) => {
  try {
    await schema.validate(body);
  } catch (err) {
    return next(createHttpError(400, err));
  }
  log.info({ body }, 'rsvping to ceremony');
  const { userId, rsvp } = body;
  try {
    await updateProfile({
      ExpressionAttributeValues: {
        ':rsvp': rsvp
      },
      UpdateExpression: 'SET attendingRehearsal = :rsvp',
      userId
    });
  } catch (err) {
    return next(err);
  }
  res.json({ success: true });
};
