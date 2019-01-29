import { CSSProperties } from '@material-ui/core/styles/withStyles';

import { theme } from '../theme';

export const commonButtonStyles: CSSProperties = {
  '&:active': {
    boxShadow: 'none'
  },
  backgroundColor: theme.palette.primary.light,
  borderColor: theme.palette.grey[200],
  borderStyle: 'solid',
  boxShadow: 'none',
  lineHeight: 'normal',
  marginLeft: -5,
  marginRight: -5,
  transition:
    'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
    'box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,' +
    'border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;'
};

export const largeButtonStyles: CSSProperties = {
  ...commonButtonStyles,
  borderWidth: 15,
  height: 110,
  width: 110,
  [theme.breakpoints.down('sm')]: {
    borderWidth: 10,
    height: 90,
    width: 90
  }
};

export const buttonHolderStyles: CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column'
};
