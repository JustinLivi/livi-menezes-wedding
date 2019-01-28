import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { VirtualTourCard } from '../../../Components/VirtualTourCard';

const styles = createStyles({});

export interface VenueAnswerProps extends WithStyles<typeof styles> {}

export class UnstyledVenueAnswer extends React.Component<VenueAnswerProps> {
  public render() {
    return <VirtualTourCard />;
  }
}

export const VenueAnswer = withStyles(styles)(UnstyledVenueAnswer);
