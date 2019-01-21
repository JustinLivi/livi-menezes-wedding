import { Router } from 'express';

import { Endpoints } from '../../../client/src/common';
import { profileRouter } from './profile';
import { quizRouter } from './quiz';
import { rsvpCeremonyRouter } from './rsvpCeremony';
import { rsvpDetails } from './rsvpDetails';
import { rsvpRehearsalRouter } from './rsvpRehearsal';

export const rootRouter = Router();

rootRouter.get(Endpoints.GET_BY_USER_ID, profileRouter);
rootRouter.post(Endpoints.RSVP_CEREMONY, rsvpCeremonyRouter);
rootRouter.post(Endpoints.RSVP_REHEARSAL, rsvpRehearsalRouter);
rootRouter.post(Endpoints.RSVP_DETAILS, rsvpDetails);
rootRouter.post(Endpoints.ANSWER_QUIZ, quizRouter);
