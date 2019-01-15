import { CardContent, createStyles, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

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

export interface ImGoingCardProps extends WithStyles<typeof styles> {
  updateAddress: (address: string) => void;
  updateFavoriteDanceSong: (name: string) => void;
  favoriteDanceSong?: string;
}

export class UnstyledImGoingCard extends React.Component<ImGoingCardProps> {
  constructor(props: ImGoingCardProps) {
    super(props);
  }

  public handleChange: React.ChangeEventHandler = event => {
    const { updateFavoriteDanceSong } = this.props;
    updateFavoriteDanceSong(get(event, 'target.value'));
  };

  public render() {
    const {
      classes: { content, topName, italic, standardCard, centered },
      updateAddress,
      favoriteDanceSong
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
          <AddressInput handleSelect={updateAddress} />
          <TextField
            id='standard-name'
            label='Your favorite dance song'
            fullWidth
            value={favoriteDanceSong}
            onBlur={this.handleChange}
            margin='normal'
          />
        </CardContent>
      </StandardCard>
    );
  }
}

export const ImGoingCard = withStyles(styles)(UnstyledImGoingCard);
