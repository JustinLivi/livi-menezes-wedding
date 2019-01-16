import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { DetailsUpdates } from '../../common';
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
  changeDetails: (updates: DetailsUpdates) => void;
  updateDetails: (update: DetailsUpdates) => void;
  address?: string;
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
      classes: { content, topName, names, italic, standardCard },
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
          <AddressInput
            onChange={this.handleChange('address')}
            onSelect={this.handleSelect}
            value={address}
          />
        </CardContent>
      </StandardCard>
    );
  }
}

export const CantMakeItCard = withStyles(styles)(UnstyledCantMakeItCard);
