import { Router } from 'express';

import { Endpoints } from '../../../client/src/common';
import { profileRouter } from './profile';
import { rsvpCeremonyRouter } from './rsvpCeremony';
import { rsvpDetails } from './rsvpDetails';

export const rootRouter = Router();

rootRouter.get(Endpoints.GET_BY_USER_ID, profileRouter);
rootRouter.post(Endpoints.RSVP_CEREMONY, rsvpCeremonyRouter);
rootRouter.post(Endpoints.RSVP_DETAILS, rsvpDetails);
