import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';

import { StandardCard } from '../../../Components/StandardCard';

const styles = createStyles({
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '100%'
  },
  centered: {
    textAlign: 'center'
  },
  content: {
    paddingTop: 25
  },
  italic: {
    fontStyle: 'italic'
  },
  topName: {
    marginBottom: 15
  }
});

export interface FirstDateAnswerProps extends WithStyles<typeof styles> {}

export class UnstyledFirstDateAnswer extends React.Component<
  FirstDateAnswerProps
> {
  public render() {
    const {
      classes: { avatar, content, topName, italic, centered }
    } = this.props;
    return (
      <StandardCard>
        <CardContent className={content}>
          <Typography
            className={classnames(italic, centered)}
            gutterBottom
            variant='body1'
            component='p'
          >
            It was a typical millennial love story: couple meets on Tinder and
            splits avocado toast two days later at their local Korean-inspired
            cafe.
          </Typography>
          <Typography className={topName} variant='h6' component='p'>
            Fun fact #1
          </Typography>
          <Typography className={topName} component='p'>
            We did go on all of these dates.
          </Typography>
          <Typography className={topName} variant='h6' component='p'>
            Fun fact #2
          </Typography>
          <Typography className={topName} component='p'>
            Dooby’s is about a block away from the George Peabody Library. We
            will be having our “first look” and splitting more avocado toast
            there before the wedding.
          </Typography>
        </CardContent>
      </StandardCard>
    );
  }
}

export const FirstDateAnswer = withStyles(styles)(UnstyledFirstDateAnswer);
