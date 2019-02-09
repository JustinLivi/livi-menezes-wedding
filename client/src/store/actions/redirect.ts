import { Action } from 'redux';
import { createActionCreator } from 'redux-keyable';

export const REDIRECTED = 'REDIRECTED';

export interface RedirectedAction extends Action<typeof REDIRECTED> {}

export const redirected = createActionCreator<undefined, RedirectedAction>(
  () => ({
    type: REDIRECTED
  })
);
