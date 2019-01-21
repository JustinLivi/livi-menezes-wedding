import * as React from 'react';
import { connect } from 'react-redux';
import { match, Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { Answer } from '../../common';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { answerQuestion } from '../../store/actions/quiz';
import { getAnswer, getUserCacheStatus, getUserId } from '../../store/selectors/user';
import { CacheStatus } from '../../store/stateDefinition';
import { DatingApp } from './Questions/DatingApp';
import { Engagement } from './Questions/Engagement';
import { FirstDate } from './Questions/FirstDate';
import { Question } from './Questions/QuestionType';
import { Venue } from './Questions/Venue';

const questions: Array<React.SFC<Question>> = [
  DatingApp,
  FirstDate,
  Engagement,
  Venue
];

// putting this here because of time constraints but ideally would be returned
// from server and UI would be code split. Deadlines are :(
const correctAnswers = [0, 0, 4, 4];

export interface OurStoryDetailsStateProps {
  answer?: Answer;
  userId?: string;
  cacheStatus: CacheStatus;
}

export interface OurStoryDetailsParentProps {
  match: match<{ questionId: string }>;
}

export interface OurStoryDetailsDispatchProps {
  answerQuestion: typeof answerQuestion;
}

export type OurStoryDetails = OurStoryDetailsStateProps &
  OurStoryDetailsDispatchProps &
  OurStoryDetailsParentProps;

export class UnconnectedOurStoryDetails extends React.Component<
  OurStoryDetails
> {
  private questionId: number;

  constructor(props: OurStoryDetails) {
    super(props);
    const {
      match: {
        params: { questionId }
      }
    } = props;
    this.questionId = parseInt(questionId, 10);
  }

  public onChange = (answerId: number) => {
    const { answerQuestion: answer, userId } = this.props;
    if (!userId) {
      return;
    }
    answer({
      answerId,
      correct: correctAnswers[this.questionId] === answerId,
      questionId: this.questionId,
      userId
    });
  };

  public render() {
    const {
      answer,
      cacheStatus,
      match: {
        params: { questionId }
      }
    } = this.props;
    const id = parseInt(questionId, 10);
    const QuestionComponent = questions[id];
    if (!QuestionComponent) {
      return <Redirect to='/our-story' />;
    }
    return (
      <ColumnLayout>
        <QuestionComponent
          disabled={
            cacheStatus === CacheStatus.PERSISTING ||
            cacheStatus === CacheStatus.FETCHING
              ? true
              : undefined
          }
          correctAnswer={correctAnswers[this.questionId]}
          onChange={this.onChange}
          value={answer && answer.answerId}
        />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [getUserId, getAnswer, getUserCacheStatus],
  (userId, answer, cacheStatus) => ({
    answer,
    cacheStatus,
    userId
  })
);

export const actionCreators = {
  answerQuestion
};

export const OurStoryDetails = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedOurStoryDetails);
