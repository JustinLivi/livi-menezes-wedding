import { CSSProperties } from '@material-ui/core/styles/withStyles';

import { theme } from '../theme';

export const commonButtonStyles: CSSProperties = {
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

export const largeButtonStyles: CSSProperties = {
  ...commonButtonStyles,
  borderWidth: 15,
  width: 110,
  height: 110
};

export const buttonHolderStyles: CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column'
};
