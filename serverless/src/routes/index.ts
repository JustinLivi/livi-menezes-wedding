import { Router } from 'express';

import { Endpoints } from '../../../client/src/common';
import { profileRouter } from './profile';
import { rsvpCeremonyRouter } from './rsvpCeremony';

export const rootRouter = Router();

rootRouter.get(Endpoints.GET_BY_PROFILE_ID, profileRouter);
rootRouter.post(Endpoints.RSVP_CEREMONY, rsvpCeremonyRouter);
