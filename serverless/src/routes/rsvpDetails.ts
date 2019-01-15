import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import * as yup from 'yup';

import { UpdateDetailsPayload } from '../../../client/src/common';
import { log } from '../log';
import { updateProfile } from '../updateProfile';

const schema = yup.object({
  address: yup.string(),
  favoriteDanceSong: yup.string(),
  userId: yup.string().required()
});

export const rsvpDetails: RequestHandler = async (
  { body }: { body: UpdateDetailsPayload },
  res,
  next
) => {
  try {
    await schema.validate(body);
  } catch (err) {
    return next(createHttpError(400, err));
  }
  log.info({ body }, 'rsvping to ceremony');
  const { userId, address, favoriteDanceSong } = body;
  try {
    if (address) {
      await updateProfile({
        ExpressionAttributeValues: { ':address': address },
        UpdateExpression: 'SET address = :address',
        userId
      });
    }
    if (favoriteDanceSong) {
      await updateProfile({
        ExpressionAttributeValues: { ':favoriteDanceSong': favoriteDanceSong },
        UpdateExpression: 'SET favoriteDanceSong = :favoriteDanceSong',
        userId
      });
    }
  } catch (err) {
    return next(err);
  }
  res.json({ success: true });
};
