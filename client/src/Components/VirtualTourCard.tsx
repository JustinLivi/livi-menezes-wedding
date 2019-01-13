import { Card, createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  iframe: {
    border: 0
  }
});

export interface VirtualTourCardProps extends WithStyles<typeof styles> {}

export const UnstyledVirtualTourCard: React.SFC<VirtualTourCardProps> = ({
  classes: { iframe }
}) => (
  <Card>
    <iframe
      className={iframe}
      src='https://www.google.com/maps/embed?pb=!4v1544237965685!6m8!1m7!1sCAoSLEFGMVFpcE5lekhDTVNaS2RwdVh5S2FpZWNSSFFQQzYwaEZpZ3gwV21TbXJD!2m2!1d39.2970425!2d-76.61492880000002!3f172.81!4f38.28!5f0.8160813932612223'
      width='100%'
      height='400'
    />
  </Card>
);

export const VirtualTourCard = withStyles(styles)(UnstyledVirtualTourCard);
