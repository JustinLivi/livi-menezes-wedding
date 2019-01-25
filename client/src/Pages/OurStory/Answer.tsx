import * as React from 'react';
import { connect } from 'react-redux';
import { match, Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { Answer } from '../../common';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { answerQuestion } from '../../store/actions/quiz';
import { getAnswers, getUserCacheStatus } from '../../store/selectors/user';
import { CacheStatus } from '../../store/stateDefinition';
import { answerComponents } from './Details';

export interface OurStoryAnswerStateProps {
  answers?: Answer[];
  cacheStatus: CacheStatus;
}

export interface OurStoryAnswerParentProps {
  match: match<{ questionId: string }>;
}

export interface OurStoryAnswerLocalState {
  shouldRotate?: boolean;
  timeoutId?: NodeJS.Timeout | null;
}

export type OurStoryAnswerProps = OurStoryAnswerStateProps &
  OurStoryAnswerParentProps;

export class UnconnectedOurStoryAnswer extends React.Component<
  OurStoryAnswerProps
> {
  constructor(props: OurStoryAnswerProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const {
      cacheStatus,
      match: {
        params: { questionId }
      }
    } = this.props;
    const id = parseInt(questionId, 10);
    const AnswerComponent = answerComponents[id] || React.Fragment;
    const answer = this.getAnswer();
    if (!AnswerComponent) {
      return <Redirect to='/our-story' />;
    }
    if (
      cacheStatus === CacheStatus.PERSISTING ||
      cacheStatus === CacheStatus.FETCHING
    ) {
      return <div />;
    }
    if (!answer) {
      return <Redirect to={`/our-story/question/${id + 1}`} />;
    }
    return (
      <ColumnLayout>
        <AnswerComponent />
        <ContinueBar
          back={`/our-story/question/${id}`}
          next={`/our-story/question/${id + 1}`}
        />
      </ColumnLayout>
    );
  }

  private extractQuestionId = () => {
    const {
      match: {
        params: { questionId: questionIdString }
      }
    } = this.props;
    return parseInt(questionIdString, 10);
  };

  private getAnswer = () => {
    const { answers } = this.props;
    return answers && answers[this.extractQuestionId()];
  };
}

export const mapStateToProps = createSelector(
  [getAnswers, getUserCacheStatus],
  (answers, cacheStatus) => ({
    answers,
    cacheStatus
  })
);

export const actionCreators = {
  answerQuestion
};

export const OurStoryAnswer = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedOurStoryAnswer);
