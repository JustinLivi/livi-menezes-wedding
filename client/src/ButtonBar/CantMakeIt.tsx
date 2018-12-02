import { createStyles, Icon, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';

import { theme } from '../theme';
import { buttonHolderStyles, largeButtonStyles } from './commonStyles';

const styles = createStyles({
  root: buttonHolderStyles,
  fab: {
    ...largeButtonStyles,
    color: theme.cantMakeIt.color,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.cantMakeIt.color
    }
  },
  label: {
    textAlign: 'center'
  }
});

export interface CantMakeItProps extends WithStyles<typeof styles> {}

export const UnstyledCantMakeIt: React.SFC<CantMakeItProps> = ({
  classes: { fab, root, label }
}) => (
  <div className={root}>
    <Fab aria-label="Can't make it" classes={{ root: fab }}>
      <Icon fontSize='large' color='inherit'>
        <SvgIcon
          fontSize='inherit'
          titleAccess="Can't make it"
          viewBox='0 0 65.92 65.92'
        >
          <path d='M45.69,33l17.6-17.61A9,9,0,0,0,50.56,2.63L33,20.23,15.35,2.63A9,9,0,0,0,2.63,15.35L20.23,33,2.63,50.56a9,9,0,0,0,0,12.73h0a9,9,0,0,0,12.72,0L33,45.69l17.6,17.6a9,9,0,0,0,12.73,0h0a9,9,0,0,0,0-12.73Z' />
        </SvgIcon>
      </Icon>
    </Fab>
    <span className={label}>can't make it</span>
  </div>
);

export const CantMakeIt = withStyles(styles)(UnstyledCantMakeIt);
