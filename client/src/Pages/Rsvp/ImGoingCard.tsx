import { CardContent, createStyles, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { DetailsUpdates } from '../../common';
import { AddressInput } from '../../Components/AddressInput';
import { StandardCard } from '../../Components/StandardCard';

const styles = createStyles({
  centered: {
    textAlign: 'center'
  },
  content: {
    paddingTop: 25
  },
  italic: {
    fontStyle: 'italic'
  },
  standardCard: {
    overflow: 'initial',
    position: 'relative'
  },
  topName: {
    marginBottom: 15
  }
});

export interface ImGoingCardParentProps extends WithStyles<typeof styles> {
  updateDetails: (updates: DetailsUpdates) => void;
  changeDetails: (updates: DetailsUpdates) => void;
}

export type ImGoingCardProps = DetailsUpdates & ImGoingCardParentProps;

export class UnstyledImGoingCard extends React.Component<ImGoingCardProps> {
  constructor(props: ImGoingCardProps) {
    super(props);
  }

  public handleBlur: (
    propName: keyof DetailsUpdates
  ) => React.ChangeEventHandler = propName => event => {
    const { updateDetails } = this.props;
    updateDetails({ [propName]: get(event, 'target.value') });
  };

  public handleChange: (
    propName: keyof DetailsUpdates
  ) => React.ChangeEventHandler = propName => event => {
    const { changeDetails } = this.props;
    changeDetails({ [propName]: get(event, 'target.value') });
  };

  public handleSelect: (address?: string) => void = address => {
    const { updateDetails } = this.props;
    updateDetails({ address });
  };

  public render() {
    const {
      classes: { content, topName, italic, standardCard, centered },
      address,
      favoriteDanceSong,
      dietaryRestrictions
    } = this.props;
    return (
      <StandardCard className={standardCard}>
        <CardContent className={content}>
          <Typography
            className={classnames(italic, centered)}
            gutterBottom
            variant='body1'
            component='p'
          >
            I'm going!
          </Typography>
          <Typography
            className={classnames(topName, centered)}
            variant='h6'
            component='p'
          >
            We're excited to see you there!
          </Typography>
          <Typography className={topName} component='p'>
            If you wouldn't mind, we'd like to collect just a few more details
            from you
          </Typography>
          <AddressInput
            onChange={this.handleChange('address')}
            onSelect={this.handleSelect}
            value={address}
          />
          <TextField
            id='standard-name'
            label='Your favorite dance song'
            fullWidth
            value={favoriteDanceSong}
            onChange={this.handleChange('favoriteDanceSong')}
            onBlur={this.handleBlur('favoriteDanceSong')}
            margin='normal'
          />
          <TextField
            id='standard-multiline-flexible'
            label='Dietary restrictions'
            fullWidth
            multiline
            rowsMax='4'
            value={dietaryRestrictions}
            onChange={this.handleChange('dietaryRestrictions')}
            onBlur={this.handleBlur('dietaryRestrictions')}
            margin='normal'
          />
        </CardContent>
      </StandardCard>
    );
  }
}

export const ImGoingCard = withStyles(styles)(UnstyledImGoingCard);
