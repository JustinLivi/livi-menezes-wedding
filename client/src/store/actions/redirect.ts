import { Action } from 'redux';

import { createActionCreator } from '../../Util/createKeyableReducer';

export const REDIRECTED = 'REDIRECTED';
export type REDIRECTED = 'REDIRECTED';

export interface RedirectedAction extends Action<REDIRECTED> {}

export const redirected = createActionCreator<undefined, RedirectedAction>(
  () => ({
    type: REDIRECTED
  })
);
