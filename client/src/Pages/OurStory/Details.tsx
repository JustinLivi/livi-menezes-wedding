import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { match, Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { Answer } from '../../common';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { answerQuestion } from '../../store/actions/quiz';
import { getAnswers, getUserCacheStatus, getUserId } from '../../store/selectors/user';
import { CacheStatus } from '../../store/stateDefinition';
import { DatingApp } from './Questions/DatingApp';
import { DatingAppAnswer } from './Questions/DatingAppAnswer';
import { Engagement } from './Questions/Engagement';
import { EngagementAnswer } from './Questions/EngagementAnswer';
import { FirstDate } from './Questions/FirstDate';
import { FirstDateAnswer } from './Questions/FirstDateAnswer';
import { Question } from './Questions/QuestionType';
import { Venue } from './Questions/Venue';
import { VenueAnswer } from './Questions/VenueAnswer';

export const questions: Array<React.SFC<Question>> = [
  DatingApp,
  FirstDate,
  Engagement,
  Venue
];

export const answerComponents: Array<React.ComponentType<any>> = [
  DatingAppAnswer,
  FirstDateAnswer,
  EngagementAnswer,
  VenueAnswer
];

// putting this here because of time constraints but ideally would be returned
// from server and UI would be code split. Deadlines are :(
const correctAnswers = [0, 0, 4, 4];

export interface OurStoryDetailsStateProps {
  answers?: Answer[];
  userId?: string;
  cacheStatus: CacheStatus;
}

export interface OurStoryDetailsParentProps {
  match: match<{ questionId: string }>;
}

export interface OurStoryDetailsDispatchProps {
  answerQuestion: typeof answerQuestion;
}

export interface OurStoryDetailsLocalState {
  shouldRotate?: boolean;
  timeoutId?: NodeJS.Timeout | null;
}

export type OurStoryDetails = OurStoryDetailsStateProps &
  OurStoryDetailsDispatchProps &
  OurStoryDetailsParentProps;

export class UnconnectedOurStoryDetails extends React.Component<
  OurStoryDetails,
  OurStoryDetailsLocalState
> {
  constructor(props: OurStoryDetails) {
    super(props);
    this.state = {};
  }

  public componentDidUpdate({
    match: {
      params: { questionId }
    }
  }: OurStoryDetails) {
    if (this.extractQuestionId() !== parseInt(questionId, 10)) {
      this.setState(prev => {
        if (prev.timeoutId) {
          clearTimeout(prev.timeoutId);
        }
        return { shouldRotate: false, timeoutId: null };
      });
      if (this.getAnswer()) {
        this.setState({
          timeoutId: setTimeout(this.shouldRotate, 3000)
        });
      }
    }
  }

  public shouldRotate = () => {
    this.setState({ shouldRotate: true, timeoutId: null });
  };

  public onChange = (answerId: number) => {
    const {
      answerQuestion: answer,
      userId,
      match: {
        params: { questionId: questionIdString }
      }
    } = this.props;
    if (!userId) {
      return;
    }
    const questionId = parseInt(questionIdString, 10);
    answer({
      answerId,
      correct: correctAnswers[questionId] === answerId,
      questionId,
      userId
    });
    setTimeout(this.shouldRotate, 1500);
  };

  public render() {
    const {
      cacheStatus,
      match: {
        params: { questionId }
      },
      answers
    } = this.props;
    const { shouldRotate } = this.state;
    const id = parseInt(questionId, 10);
    const QuestionComponent = questions[id];
    const AnswerComponent = answerComponents[id] || React.Fragment;
    const answer = this.getAnswer();
    if (!QuestionComponent) {
      return <Redirect to='/our-story' />;
    }
    return (
      <Motion
        defaultStyle={{ rot: 0 }}
        style={{
          rot:
            answer && shouldRotate
              ? spring(180, { stiffness: 150, damping: 100 })
              : 0
        }}
      >
        {({ rot }) => (
          <ColumnLayout
            style={{
              transform: `rotateY(${rot < 90 ? rot : 180 - rot}deg)`
            }}
          >
            {rot < 90 ? (
              <QuestionComponent
                disabled={
                  cacheStatus === CacheStatus.PERSISTING ||
                  cacheStatus === CacheStatus.FETCHING
                    ? true
                    : undefined
                }
                correctAnswer={correctAnswers[id]}
                onChange={this.onChange}
                value={answer && answer.answerId}
              />
            ) : rot < 178 ? (
              <AnswerComponent />
            ) : (
              <Redirect to={`/our-story/answer/${id}`} />
            )}
            <div
              style={{
                opacity: !answer || !shouldRotate || rot > 175 ? 1 : 0
              }}
            >
              <ContinueBar
                back={`/our-story${
                  !id
                    ? ''
                    : answers && answers[id - 1]
                    ? `/answer/${id - 1}`
                    : `/question/${id - 1}`
                }`}
                next={
                  answer
                    ? `/our-story/answer/${id}`
                    : `/our-story/question/${id + 1}`
                }
              />
            </div>
          </ColumnLayout>
        )}
      </Motion>
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
  [getUserId, getAnswers, getUserCacheStatus],
  (userId, answers, cacheStatus) => ({
    answers,
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
