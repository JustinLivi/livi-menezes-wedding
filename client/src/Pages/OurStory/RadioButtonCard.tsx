import { CardActionArea, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';
import { map } from 'lodash';
import * as React from 'react';

import { StandardCard } from '../../Components/StandardCard';

export interface RadioButtonCardProps {
  question: string;
  answers: string[];
}

export const RadioButtonCard: React.SFC<RadioButtonCardProps> = ({
  question,
  answers
}) => (
  <StandardCard>
    <CardActionArea>
      <CardContent>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{question}</FormLabel>
          <RadioGroup aria-label={question} name={question}>
            {map(answers, (answer, i) => (
              <FormControlLabel
                key={i}
                value={answer}
                control={<Radio />}
                label={answer}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </CardActionArea>
  </StandardCard>
);
