import { CSSProperties } from '@material-ui/core/styles/withStyles';

import { theme } from '../theme';

export const card: CSSProperties = {
  flexGrow: 1,
  maxWidth: 400
};

export const root: CSSProperties = {
  margin: theme.spacing.unit,
  flexGrow: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  boxPack: 'center'
};
