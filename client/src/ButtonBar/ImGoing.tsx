import { createStyles, Icon, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';

import { theme } from '../theme';
import { buttonHolderStyles, largeButtonStyles } from './commonStyles';

const styles = createStyles({
  disabled: {},
  label: {
    textAlign: 'center'
  },
  largeButton: {
    ...largeButtonStyles,
    '&:hover': {
      backgroundColor: theme.imGoing.color,
      color: theme.palette.primary.light
    },
    color: theme.imGoing.color
  },
  root: {
    '&$disabled': {
      backgroundColor: theme.imGoing.color,
      color: theme.palette.primary.light
    }
  },
  rootDiv: buttonHolderStyles
});

export interface ImGoingProps extends WithStyles<typeof styles> {
  onClick: React.MouseEventHandler;
  selected?: boolean;
  disabled?: boolean;
  help?: string;
}

export const UnstyledImGoing: React.SFC<ImGoingProps> = ({
  help,
  onClick,
  selected,
  disabled: isDisabled,
  classes: { root, rootDiv, label, disabled, largeButton }
}) => (
  <div className={rootDiv}>
    <Fab
      aria-label={help}
      className={largeButton}
      classes={{
        disabled,
        root: selected ? root : undefined
      }}
      onClick={onClick}
      disabled={isDisabled}
    >
      <Icon fontSize='large' color='inherit'>
        <SvgIcon fontSize='inherit' titleAccess={help} viewBox='0 0 80 70.33'>
          <path d='M58.33,0A21.63,21.63,0,0,0,40,10.13,21.66,21.66,0,0,0,0,21.67C0,37.33,21.31,56,40,70.33c19.83-15.66,40-31,40-48.66A21.67,21.67,0,0,0,58.33,0Z' />
        </SvgIcon>
      </Icon>
    </Fab>
    {help && <span className={label}>{help}</span>}
  </div>
);

export const ImGoing = withStyles(styles)(UnstyledImGoing);
