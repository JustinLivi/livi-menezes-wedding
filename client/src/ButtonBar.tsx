import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import * as React from 'react';

import { CantMakeIt } from './icons/CantMakeIt';
import { Details } from './icons/Details';
import { ImGoing } from './icons/ImGoing';
import { theme } from './theme';

const commonButtonStyles = {
  marginLeft: -6,
  marginRight: -6,
  backgroundColor: theme.palette.primary.light,
  transition:
    'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
    'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
    'border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
  boxShadow: 'none',
  borderStyle: 'solid',
  borderColor: theme.palette.grey[200],
  '&:active': {
    boxShadow: 'none'
  }
};

const largeButtonStyles = {
  ...commonButtonStyles,
  borderWidth: 15,
  width: 110,
  height: 110
};

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    boxPack: 'center',
    margin: theme.spacing.unit
  },
  buttonBar: {
    flexGrow: 0
  },
  cantMakeIt: {
    ...largeButtonStyles,
    color: theme.cantMakeIt.color,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.cantMakeIt.color
    }
  },
  cantMakeItLogo: {},
  imGoing: {
    ...largeButtonStyles,
    color: theme.imGoing.color,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.imGoing.color
    }
  },
  imGoingLogo: {},
  details: {
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
  detailsLogo: {}
});

export interface ButtonBarProps extends WithStyles<typeof styles> {}

export const UnstyledButtonBar: React.SFC<ButtonBarProps> = ({
  classes: {
    cantMakeIt,
    cantMakeItLogo,
    details,
    detailsLogo,
    imGoing,
    imGoingLogo,
    root,
    buttonBar
  }
}) => (
  <div className={root}>
    <div className={buttonBar}>
      <Fab aria-label="Can't make it" classes={{ root: cantMakeIt }}>
        <CantMakeIt classes={{ root: cantMakeItLogo }} />
      </Fab>
      <Fab aria-label='Details' classes={{ root: details }}>
        <Details classes={{ root: detailsLogo }} />
      </Fab>
      <Fab aria-label="I'm going" classes={{ root: imGoing }}>
        <ImGoing classes={{ root: imGoingLogo }} />
      </Fab>
    </div>
  </div>
);

export const ButtonBar = withStyles(styles)(UnstyledButtonBar);
