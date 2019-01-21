import { Endpoints, QuizPayload, UserData } from '../../common';
import { createRsaaActionCreator, RsaaActionSet } from '../../Util/rsaaActionCreator';
import { RsaaMeta } from '../../Util/rsaaActionCreatorFactory';

export interface QuizMeta extends RsaaMeta<'POST', Endpoints.ANSWER_QUIZ> {
  body: QuizPayload;
}

export type QuizActionSet = RsaaActionSet<QuizMeta, UserData, {}>;

export const answerQuestion = createRsaaActionCreator<
  QuizMeta['body'],
  QuizActionSet
>(body => ({
  body,
  endpoint: Endpoints.ANSWER_QUIZ,
  method: 'POST'
}));
