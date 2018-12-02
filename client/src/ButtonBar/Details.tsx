import { createStyles, Icon, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';

import { theme } from '../theme';
import { buttonHolderStyles, commonButtonStyles } from './commonStyles';

const styles = createStyles({
  root: buttonHolderStyles,
  fab: {
    ...commonButtonStyles,
    color: theme.details.color,
    borderWidth: 13,
    width: 80,
    height: 80,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.details.color
    }
  },
  label: {
    textAlign: 'center'
  }
});

export interface DetailsProps extends WithStyles<typeof styles> {}

export const UnstyledDetails: React.SFC<DetailsProps> = ({
  classes: { fab, root, label }
}) => (
  <div className={root}>
    <Fab aria-label='Details' classes={{ root: fab }}>
      <Icon color='inherit'>
        <SvgIcon
          fontSize='inherit'
          titleAccess='Details'
          viewBox='0 0 20.51 46.42'
        >
          <path d='M19.9,41.41l-.65,2.65q-2.92,1.15-4.66,1.76a12.4,12.4,0,0,1-4,.6,8.06,8.06,0,0,1-5.5-1.72,5.6,5.6,0,0,1-2-4.38,15.29,15.29,0,0,1,.15-2.11c.1-.71.26-1.52.47-2.43l2.44-8.61c.21-.82.4-1.6.54-2.34a10.25,10.25,0,0,0,.23-2,3.14,3.14,0,0,0-.68-2.3,3.87,3.87,0,0,0-2.6-.64,6.62,6.62,0,0,0-1.94.29c-.66.2-1.23.38-1.7.56l.65-2.65c1.59-.65,3.12-1.21,4.57-1.67a13.78,13.78,0,0,1,4.13-.69,7.88,7.88,0,0,1,5.42,1.69,5.62,5.62,0,0,1,1.9,4.41c0,.37,0,1-.13,2a13.23,13.23,0,0,1-.49,2.59L13.63,35a20.8,20.8,0,0,0-.53,2.35,12.46,12.46,0,0,0-.24,2,2.86,2.86,0,0,0,.77,2.33,4.3,4.3,0,0,0,2.64.62,8,8,0,0,0,2-.31A11.66,11.66,0,0,0,19.9,41.41Zm.61-36a5,5,0,0,1-1.69,3.82,5.79,5.79,0,0,1-4.08,1.58,5.85,5.85,0,0,1-4.1-1.58A5,5,0,0,1,8.93,5.42a5,5,0,0,1,1.71-3.83A5.82,5.82,0,0,1,14.74,0a5.75,5.75,0,0,1,4.08,1.59A5.06,5.06,0,0,1,20.51,5.42Z' />
        </SvgIcon>
      </Icon>
    </Fab>
    <span className={label}>details</span>
  </div>
);

export const Details = withStyles(styles)(UnstyledDetails);
