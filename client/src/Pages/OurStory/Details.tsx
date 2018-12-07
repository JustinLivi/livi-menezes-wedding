import * as React from 'react';

import { CheckboxCard } from '../../Components/CheckboxCard';
import { RadioButtonCard } from '../../Components/RadioButtonCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';

export const OurStoryDetails: React.SFC = () => (
  <ColumnLayout>
    <RadioButtonCard
      question='On what online dating app did we meet?'
      answers={[
        'Tinder',
        'OkCupid',
        'Coffee meets Bagel',
        'Bumble',
        'Farmers Only'
      ]}
    />
    <RadioButtonCard
      question='Who took the conversation "off the app?" (switched to text message conversation)'
      answers={['Justin', 'Marisa']}
    />
    <RadioButtonCard
      question='Where was our first date?'
      answers={[
        "Dooby's",
        "The Brewer's Art",
        'The Helmand',
        'The Owl Bar',
        'The Crown'
      ]}
    />
    <CheckboxCard
      question='Which of the following places have we been to together?'
      answers={['Croatia', 'Spain', 'Italy', 'Montana', 'California']}
    />
    <RadioButtonCard
      question='How long did we wait before moving in together?'
      answers={[
        '2 weeks',
        '9 months',
        '525,600 minutes',
        '13 months',
        '4 years'
      ]}
    />
    <CheckboxCard
      question='Which of the following neighborhoods have we lived in together?'
      answers={[
        'Mount Vernon',
        'Capitol Hill',
        'Del Ray',
        'Station North',
        'Forest Hills'
      ]}
    />
    <RadioButtonCard
      question='How close are we in age?'
      answers={[
        'Justin is 3 years older',
        'Justin is 1 year older',
        'Same age',
        'Marisa is 1 year older',
        'Marisa is 3 years older'
      ]}
    />
  </ColumnLayout>
);
