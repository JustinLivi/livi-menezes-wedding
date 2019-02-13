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

export interface BondOverAnswerProps extends WithStyles<typeof styles> {}

export class UnstyledBondOverAnswer extends React.Component<
  BondOverAnswerProps
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
            We both participated in community supported agriculture (CSA), and
            we commiserated over receiving way too much kale.
          </Typography>
          <Typography
            className={classnames(italic, centered)}
            gutterBottom
            variant='body1'
            component='p'
          >
            WAY TOO MUCH KALE.
          </Typography>
          <Typography className={topName} gutterBottom component='p'>
            Justin is a cat person.
          </Typography>
          <Typography className={topName} gutterBottom component='p'>
            Justin hesitantly confessed to being a vegetarian, and Marisa
            ordered a hamburger on their third date.
          </Typography>
          <Typography className={topName} gutterBottom component='p'>
            Justin promised that he would never be able to help with Marisa’s
            tech problems despite being a software engineer. He later admitted
            that she is technologically cursed, but Marisa did code part of this
            website.
          </Typography>
          <Typography className={topName} component='p'>
            Marisa is a dog person.
          </Typography>
        </CardContent>
      </StandardCard>
    );
  }
}

export const BondOverAnswer = withStyles(styles)(UnstyledBondOverAnswer);
