import { Router } from 'express';
import { profileRouter } from './profile';

export const rootRouter = Router();

enum Resources {
  FetchSingleProfile = '/profile/:profileId'
}

rootRouter.get(Resources.FetchSingleProfile, profileRouter);
