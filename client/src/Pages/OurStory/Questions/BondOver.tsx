import * as React from 'react';

import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';

export const BondOver: React.SFC<Question> = props => (
  <RadioButtonCard
    {...props}
    question='What did we bond over on our first date?'
    answers={[
      'Our love of cats',
      'Our hatred of participating in community supported agriculture (CSA)',
      'Being Vegetarian',
      'Our tech talents',
      'Our love of dogs'
    ]}
  />
);
