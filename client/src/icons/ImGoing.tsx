import { createStyles, Icon, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {}
});

export interface ImGoingProps extends WithStyles<typeof styles> {}

export const UnstyledImGoing: React.SFC<ImGoingProps> = ({
  classes: { root }
}) => (
  <Icon classes={{ root }} fontSize='large' color='inherit'>
    <SvgIcon
      fontSize='inherit'
      titleAccess="I'm going"
      viewBox='0 0 80 70.33'
      classes={{ root }}
    >
      <path d='M58.33,0A21.63,21.63,0,0,0,40,10.13,21.66,21.66,0,0,0,0,21.67C0,37.33,21.31,56,40,70.33c19.83-15.66,40-31,40-48.66A21.67,21.67,0,0,0,58.33,0Z' />
    </SvgIcon>
  </Icon>
);

export const ImGoing = withStyles(styles)(UnstyledImGoing);
