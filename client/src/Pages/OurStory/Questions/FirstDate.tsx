import * as React from 'react';

import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';

export const FirstDate: React.SFC<Question> = params => (
  <RadioButtonCard
    {...params}
    question='Where was our first date?'
    answers={[
      "Coffee Shop (Dooby's)",
      'Trivia Night (Alewife)',
      'Swing Dancing with high schoolers (Mobtown Ballroom)',
      "Local bluegrass night at an Irish pub (MJ O'Connor's)",
      'Drinks at the bar (Owl Bar)',
      'All of the above'
    ]}
  />
);
