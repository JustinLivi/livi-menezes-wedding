import { Avatar, CardContent, createStyles, Grid, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { DetailsUpdates } from '../../common';
import { AddressInput } from '../../Components/AddressInput';
import { StandardCard } from '../../Components/StandardCard';

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
    paddingTop: 15
  },
  italic: {
    fontStyle: 'italic'
  },
  topName: {
    marginBottom: 15
  }
});

export interface ImGoingCardParentProps extends WithStyles<typeof styles> {
  updateDetails: (updates: DetailsUpdates) => void;
  changeDetails: (updates: DetailsUpdates) => void;
  username?: string;
  name?: string;
  photo?: string;
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
      username,
      name,
      classes: { avatar, content, topName, italic, centered },
      address,
      favoriteDanceSong,
      dietaryRestrictions,
      photo
    } = this.props;
    return (
      <StandardCard>
        <CardContent className={content}>
          <Grid className={avatar}>
            <Avatar alt={username || name || 'Loading...'} src={photo}>
              {username || name || 'Loading...'}
            </Avatar>
          </Grid>
          <Typography
            className={classnames(italic, centered)}
            gutterBottom
            variant='body1'
            component='p'
          >
            {username ? `${username} is` : "I'm"} going!
          </Typography>
          <Typography
            className={classnames(topName, centered)}
            variant='h6'
            component='p'
          >
            {username
              ? "We're excited they're coming!"
              : "We're excited to see you there!"}
          </Typography>
          <Typography className={topName} component='p'>
            {username
              ? `Can you fill out these details for ${username}?`
              : 'We need just a few more details from you'}
          </Typography>
          <AddressInput
            onChange={this.handleChange('address')}
            onSelect={this.handleSelect}
            value={address || ''}
          />
          <TextField
            id='standard-name'
            label='Favorite dance song'
            fullWidth
            value={favoriteDanceSong || ''}
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
            value={dietaryRestrictions || ''}
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
