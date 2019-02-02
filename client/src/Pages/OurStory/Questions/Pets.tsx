import * as React from 'react';

import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';

export const Pets: React.SFC<Question> = props => (
  <RadioButtonCard
    {...props}
    question='Who are Nugget and JJ?'
    answers={[
      'A Queen and a Prince',
      'A strong, independent woman and an anxious, whiny man',
      'A rapper and an English gentleman',
      'A Cat and a Dog',
      'Our little family',
      'All of the Above'
    ]}
  />
);
