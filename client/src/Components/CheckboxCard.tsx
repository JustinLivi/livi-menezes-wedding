import {
  CardActionArea,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import { map } from 'lodash';
import * as React from 'react';

import { StandardCard } from './StandardCard';

export interface ICheckboxCardProps {
  question: string;
  answers: string[];
}

export const CheckboxCard: React.SFC<ICheckboxCardProps> = ({
  question,
  answers
}) => (
  <StandardCard>
    <CardActionArea>
      <CardContent>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{question}</FormLabel>
          <FormGroup aria-label={question}>
            {map(answers, (answer, i) => (
              <FormControlLabel
                key={i}
                label={answer}
                control={<Checkbox value={answer} />}
              />
            ))}
          </FormGroup>
        </FormControl>
      </CardContent>
    </CardActionArea>
  </StandardCard>
);
