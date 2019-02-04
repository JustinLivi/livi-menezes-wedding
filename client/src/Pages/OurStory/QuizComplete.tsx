import { Typography } from '@material-ui/core';
import { reduce } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { Answer } from '../../common';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { getAnswers } from '../../store/selectors/user';
import celebrate from './Celebrate.jpg';
import { questions } from './Details';

export interface QuizStateProps {
  answers?: Answer[];
}

export const UnconnectedQuizComplete: React.SFC<QuizStateProps> = ({
  answers
}) => (
  <ColumnLayout>
    <ProfileCard
      image={celebrate}
      title='Quiz Complete!'
      blurb={
        <React.Fragment>
          <Typography component='p'>
            You got{' '}
            {reduce(
              answers,
              (totalCount, answer) => totalCount + (answer.correct ? 1 : 0),
              0
            ) || 0}{' '}
            out of {(answers && answers.length) || 0} questions correct!
          </Typography>
          <Typography component='p'>
            Continue below to get travel information.
          </Typography>
        </React.Fragment>
      }
    />
    <ContinueBar
      back={`/our-story/answer/${questions.length - 1}`}
      next='/directions'
    />
  </ColumnLayout>
);

const mapStateToProps = createSelector(
  [getAnswers],
  answers => ({
    answers
  })
);

export const QuizComplete = connect(mapStateToProps)(UnconnectedQuizComplete);
