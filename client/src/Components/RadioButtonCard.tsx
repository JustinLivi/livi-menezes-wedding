import {
  Card,
  CardActionArea,
  CardContent,
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { map } from 'lodash';
import * as React from 'react';

import { theme } from '../theme';

const styles = createStyles({
  card: {
    flexGrow: 1,
    maxWidth: 400
  },
  root: {
    margin: theme.spacing.unit,
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxPack: 'center'
  }
});

export interface RadioButtonCardProps extends WithStyles<typeof styles> {
  question: string;
  answers: string[];
}

export const UnstyledRadioButtonCard: React.SFC<RadioButtonCardProps> = ({
  question,
  answers,
  classes: { root, card }
}) => (
  <div className={root}>
    <Card className={card}>
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
    </Card>
  </div>
);

export const RadioButtonCard = withStyles(styles)(UnstyledRadioButtonCard);
