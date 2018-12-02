import { createStyles, Icon, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  root: {}
});

export interface CantMakeItProps extends WithStyles<typeof styles> {}

export const UnstyledCantMakeIt: React.SFC<CantMakeItProps> = ({
  classes: { root }
}) => (
  <Icon classes={{ root }} fontSize='large' color='inherit'>
    <SvgIcon
      fontSize='inherit'
      titleAccess="Can't make it"
      viewBox='0 0 65.92 65.92'
      classes={{ root }}
    >
      <path d='M45.69,33l17.6-17.61A9,9,0,0,0,50.56,2.63L33,20.23,15.35,2.63A9,9,0,0,0,2.63,15.35L20.23,33,2.63,50.56a9,9,0,0,0,0,12.73h0a9,9,0,0,0,12.72,0L33,45.69l17.6,17.6a9,9,0,0,0,12.73,0h0a9,9,0,0,0,0-12.73Z' />
    </SvgIcon>
  </Icon>
);

export const CantMakeIt = withStyles(styles)(UnstyledCantMakeIt);
