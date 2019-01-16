import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { AddressInput } from '../../Components/AddressInput';
import { StandardCard } from '../../Components/StandardCard';

const styles = createStyles({
  content: {
    paddingTop: 25,
    textAlign: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  names: {
    letterSpacing: 5
  },
  standardCard: {
    overflow: 'initial',
    position: 'relative'
  },
  topName: {
    marginBottom: 15
  }
});

export interface CantMakeItCardProps extends WithStyles<typeof styles> {
  updateAddress: (address: string) => void;
  address?: string;
}

export class UnstyledCantMakeItCard extends React.Component<
  CantMakeItCardProps
> {
  constructor(props: CantMakeItCardProps) {
    super(props);
  }

  public handleChange = (event: Event) => {
    this.setState({
      address: get(event, 'target.value')
    });
  };

  public render() {
    const {
      classes: { content, topName, names, italic, standardCard },
      updateAddress,
      address
    } = this.props;
    return (
      <StandardCard className={standardCard}>
        <CardContent className={content}>
          <Typography
            className={italic}
            gutterBottom
            variant='body1'
            component='p'
          >
            Can't Make It
          </Typography>
          <Typography
            className={classnames(names, topName)}
            variant='h6'
            component='p'
          >
            We will miss you!
          </Typography>
          <AddressInput handleSelect={updateAddress} value={address} />
        </CardContent>
      </StandardCard>
    );
  }
}

export const CantMakeItCard = withStyles(styles)(UnstyledCantMakeItCard);
