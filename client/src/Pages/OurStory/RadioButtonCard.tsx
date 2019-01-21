import {
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
import { Check, Close } from '@material-ui/icons';
import { map } from 'lodash';
import * as React from 'react';

import { StandardCard } from '../../Components/StandardCard';

const commonStyles: React.CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'stretch'
};

export const styles = createStyles({
  correctLabel: {
    '&$disabled': {
      ...commonStyles,
      color: 'green',
      flexGrow: 1
    }
  },
  correctRadio: {
    '&$disabled': {
      ...commonStyles,
      color: 'green'
    }
  },
  disabled: {},
  expand: {
    flexGrow: 1
  },
  formControlRoot: {
    display: 'flex'
  },
  icon: {
    marginLeft: 5
  },
  incorrectLabel: {
    '&$disabled': {
      ...commonStyles,
      color: 'red',
      flexGrow: 1
    }
  },
  incorrectRadio: {
    '&$disabled': {
      ...commonStyles,
      color: 'red'
    }
  }
});

export interface RadioButtonCardProps extends WithStyles<typeof styles> {
  onChange: (index: number) => void;
  value?: number;
  correctAnswer: number;
  question: string;
  answers: string[];
  disabled?: boolean;
}

export class UnstyledRadioButtonCard extends React.Component<
  RadioButtonCardProps
> {
  constructor(props: RadioButtonCardProps) {
    super(props);
  }

  public handleChange: (event: React.ChangeEvent<{}>, value: string) => void = (
    event,
    value
  ) => {
    this.props.onChange(parseInt(value, 10));
  };

  public render() {
    const {
      question,
      answers,
      value,
      correctAnswer,
      disabled: isDisabled,
      classes: {
        disabled,
        correctLabel,
        incorrectLabel,
        correctRadio,
        incorrectRadio,
        icon,
        expand,
        formControlRoot
      }
    } = this.props;
    return (
      <StandardCard>
        <CardContent>
          <FormControl classes={{ root: formControlRoot }} component='fieldset'>
            <FormLabel component='h1'>{question}</FormLabel>
            <RadioGroup
              aria-label={question}
              value={`${value}`}
              name={question}
              onChange={this.handleChange}
            >
              {map(answers, (answer, i) => (
                <FormControlLabel
                  classes={
                    value === undefined
                      ? undefined
                      : correctAnswer === i
                      ? { disabled, label: correctLabel }
                      : value === i
                      ? { disabled, label: incorrectLabel }
                      : undefined
                  }
                  disabled={
                    isDisabled !== undefined ? isDisabled : value !== undefined
                  }
                  key={i}
                  value={`${i}`}
                  control={
                    <Radio
                      classes={
                        value === undefined
                          ? undefined
                          : correctAnswer === i
                          ? { disabled, colorSecondary: correctRadio }
                          : value === i
                          ? { disabled, colorSecondary: incorrectRadio }
                          : undefined
                      }
                    />
                  }
                  label={
                    <React.Fragment>
                      <span className={expand}>{answer}</span>
                      {value === undefined ? (
                        undefined
                      ) : correctAnswer === i ? (
                        <Check className={icon} />
                      ) : value === i ? (
                        <Close className={icon} />
                      ) : (
                        undefined
                      )}
                    </React.Fragment>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </StandardCard>
    );
  }
}

export const RadioButtonCard = withStyles(styles)(UnstyledRadioButtonCard);
