import * as React from 'react';

import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';

export const Engagement: React.SFC<Question> = params => (
  <RadioButtonCard
    {...params}
    question='How did we get engaged?'
    answers={[
      'Slow dance in our living room',
      'Justin wrote a song',
      'At the top of a mountain',
      'Just talked about it',
      'All of the above'
    ]}
  />
);
