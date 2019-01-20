import { Avatar, CardContent, createStyles, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
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
    paddingTop: 25
  },
  italic: {
    fontStyle: 'italic'
  },
  standardCard: {
    height: 450,
    maxHeight: 'calc(100vh - 260px)',
    overflow: 'auto',
    position: 'relative'
  },
  topName: {
    marginBottom: 15
  }
});

export interface CantMakeItCardProps extends WithStyles<typeof styles> {
  changeDetails: (updates: DetailsUpdates) => void;
  updateDetails: (update: DetailsUpdates) => void;
  username?: string;
  address?: string;
  name?: string;
  photo?: string;
}

export class UnstyledCantMakeItCard extends React.Component<
  CantMakeItCardProps
> {
  constructor(props: CantMakeItCardProps) {
    super(props);
  }

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
      classes: { avatar, content, topName, italic, standardCard, centered },
      photo,
      username,
      address
    } = this.props;
    return (
      <StandardCard className={standardCard}>
        <CardContent className={content}>
          <Grid className={avatar}>
            <Avatar alt={username || 'Me'} src={photo}>
              {username || name}
            </Avatar>
          </Grid>
          <Typography
            className={classnames(italic, centered)}
            gutterBottom
            variant='body1'
            component='p'
          >
            {username ? `${username} C` : 'C'}an't Make It
          </Typography>
          <Typography
            className={classnames(topName, centered)}
            variant='h6'
            component='p'
          >
            We will miss {username ? 'them' : 'you'}!
          </Typography>
          <Typography className={topName} component='p'>
            {username
              ? `Can you fill out these details for ${username}?`
              : "If you wouldn't mind, we'd like to collect just a few more details from you"}
          </Typography>
          <AddressInput
            onChange={this.handleChange('address')}
            onSelect={this.handleSelect}
            value={address || ''}
          />
        </CardContent>
      </StandardCard>
    );
  }
}

export const CantMakeItCard = withStyles(styles)(UnstyledCantMakeItCard);
