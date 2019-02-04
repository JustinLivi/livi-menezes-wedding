import * as React from 'react';

import { RadioButtonCard } from '../RadioButtonCard';
import { Question } from './QuestionType';

export const Travel: React.SFC<Question> = props => (
  <RadioButtonCard
    {...props}
    question='Which trip have we NOT taken together?'
    answers={[
      'Anniversary trip to Spain',
      'Romantic getaway in Croatia',
      'Camping in Glacier National Park',
      'Wedding in California',
      'Cousins’ Weekend in Alabama'
    ]}
  />
);
