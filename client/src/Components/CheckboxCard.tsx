import {
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
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

export interface CheckboxCardProps extends WithStyles<typeof styles> {
  question: string;
  answers: string[];
}

export const UnstyledCheckboxCard: React.SFC<CheckboxCardProps> = ({
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
    </Card>
  </div>
);

export const CheckboxCard = withStyles(styles)(UnstyledCheckboxCard);
