import { Endpoints } from '../../common';
import {
  combineKeyableRsaaReducers,
  createKeyableFailureReducer,
  createKeyableRequestReducer,
  createKeyableSuccessReducer,
} from '../../Util/rsaaActionCreator';
import { QuizActionSet } from '../actions/quiz';
import { CacheStatus, initialState, State } from '../stateDefinition';

export const quizRequestReducer = createKeyableRequestReducer<
  State,
  QuizActionSet
>(Endpoints.ANSWER_QUIZ, 'POST', state => {
  state.userCacheStatus = CacheStatus.PERSISTING;
});

export const quizSuccessReducer = createKeyableSuccessReducer<
  State,
  QuizActionSet
>(
  Endpoints.ANSWER_QUIZ,
  'POST',
  (
    state,
    {
      meta: {
        body: { answerId, questionId, correct }
      }
    }
  ) => {
    state.userCacheStatus = CacheStatus.UP_TO_DATE;
    if (!state.user) {
      return;
    }
    const {
      user: { answers }
    } = state;
    answers[questionId] = {
      answerId,
      correct
    };
  }
);

export const quizFailureReducer = createKeyableFailureReducer<
  State,
  QuizActionSet
>(Endpoints.ANSWER_QUIZ, 'POST', (state, { meta: {} }) => {
  state.userCacheStatus = CacheStatus.ERRORED;
});

export const quizRootReducer = combineKeyableRsaaReducers<State>(initialState)(
  quizRequestReducer,
  quizSuccessReducer,
  quizFailureReducer
);
