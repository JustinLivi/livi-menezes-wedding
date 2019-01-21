import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import * as yup from 'yup';

import { Answer, QuizPayload } from '../../../client/src/common';
import { log } from '../log';
import { updateProfile } from '../updateProfile';

const schema = yup.object({
  answerId: yup.number().required(),
  correct: yup.boolean().required(),
  questionId: yup.number().required(),
  userId: yup.string().required()
});

export const quizRouter: RequestHandler = async (
  { body }: { body: QuizPayload },
  res,
  next
) => {
  try {
    await schema.validate(body);
  } catch (err) {
    return next(createHttpError(400, err));
  }
  log.info({ body }, 'answering question');
  const { userId, answerId, questionId, correct } = body;
  const answer: Answer = { answerId, correct };
  try {
    await updateProfile({
      ExpressionAttributeValues: {
        ':answer': answer
      },
      UpdateExpression: `SET answers[${questionId}] = :answer`,
      userId
    });
  } catch (err) {
    return next(err);
  }
  res.json({ success: true });
};
