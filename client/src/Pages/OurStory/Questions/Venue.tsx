import * as React from 'react';

import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';

export const Venue: React.SFC<Question> = params => (
  <RadioButtonCard
    {...params}
    question='Why the George Peabody Library?'
    answers={[
      'We only looked at one venue',
      "It's in our old neighborhood",
      'We love Baltimore',
      "We love Disney, and it's like Beauty and the Beast",
      'All of the above'
    ]}
  />
);
