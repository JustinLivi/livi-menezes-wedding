import * as React from 'react';

import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';

export const DatingApp: React.SFC<Question> = props => (
  <RadioButtonCard
    {...props}
    question='On what online dating app did we meet?'
    answers={[
      'Tinder',
      'OkCupid',
      'Coffee meets Bagel',
      'Bumble',
      'Farmers Only'
    ]}
  />
);
