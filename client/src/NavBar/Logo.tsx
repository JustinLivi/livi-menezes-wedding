import { createStyles, Icon, SvgIcon, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

const styles = createStyles({
  grow: {
    flexGrow: 0
  },
  root: {
    textAlign: 'center',
    width: '3em'
  }
});

export interface ILogoProps extends WithStyles<typeof styles> {}

export const UnstyledLogo: React.SFC<ILogoProps> = ({
  classes: { grow, root }
}) => (
  <span className={grow}>
    <Icon classes={{ root }} fontSize='large'>
      <SvgIcon
        fontSize='inherit'
        titleAccess='hitchd'
        viewBox='0 0 168.38 69.05'
        classes={{ root }}
      >
        <path d='M49.11,31.56V53.92c0,7.53,4.65,15.39,16.43,14.24V59.65c-5.26.38-7.19-2.47-7.19-6V39.89h6.41V31.64H58.35l.08-.08Z' />
        <rect x='35.42' y='31.56' width='9.3' height='36.6' />
        <path d='M16.17,30.65A17.8,17.8,0,0,0,9.3,31.93V15.27H0V68.16H9.3V45c.55-2.37,2.58-5.13,7.09-5.13,6,0,6.69,5.19,6.69,6.72V68.16h9.25V46.07C32.33,40.46,28.79,30.65,16.17,30.65Z' />
        <path d='M112.63,30.65a17.8,17.8,0,0,0-6.87,1.28V22.24h-9.3V68.16h9.3V45c.55-2.37,2.58-5.13,7.09-5.13,6,0,6.69,5.19,6.69,6.72V68.16h9.26V46.07C128.8,40.46,125.25,30.65,112.63,30.65Z' />
        <path d='M159,15.27V34.86c-2.68-2.15-5.35-4.21-10.58-4.21-7.06,0-17.43,6.17-17.43,19.72a18.57,18.57,0,0,0,18.69,18.68,18.87,18.87,0,0,0,18.69-18.68V15.27Zm-9.48,45c-2.83,0-9.2-2.27-9.2-10.43,0-7.7,5.9-10.43,8.88-10.43a10,10,0,0,1,9.7,10.43C158.91,58.41,152.12,60.29,149.53,60.29Z' />
        <path d='M85.16,30.65c-9.48.46-17.43,6.17-17.43,19.72,0,10.09,6.29,18.68,18.69,18.68a15.86,15.86,0,0,0,6.3-.94V59.53a25.09,25.09,0,0,1-6.46.76c-3.16,0-9.2-2.27-9.2-10.43,0-7.7,5.54-10.29,8.88-10.43a15.21,15.21,0,0,1,6.78,1V32.2A13.4,13.4,0,0,0,85.16,30.65Z' />
        <path d='M52.8,10.41a10.93,10.93,0,0,0-5.33-4.06C45.91,1.41,39.89-1.2,33.93.54S24.2,7.83,25.67,12.88c1,3.48,4.22,5.83,8.09,6.39a11.14,11.14,0,0,0,10.33,7,10.41,10.41,0,0,0,10.32-8A10,10,0,0,0,52.8,10.41Zm-10.56.44a7.27,7.27,0,0,1-3.74,3A5.38,5.38,0,0,1,42.24,10.85Zm-11.77.63C29.78,9.12,32,6.31,35.33,5.34A8.39,8.39,0,0,1,37.67,5a6.46,6.46,0,0,1,3.52,1,10.24,10.24,0,0,0-7.87,7.73c0,.12,0,.23,0,.35A4,4,0,0,1,30.47,11.48Zm19.05,5.7a5.55,5.55,0,0,1-6.76,3.93,6.1,6.1,0,0,1-3.57-2.24h.07a12,12,0,0,0,8-7,5.76,5.76,0,0,1,1.42,1.41A5,5,0,0,1,49.52,17.18Z' />
      </SvgIcon>
    </Icon>
  </span>
);

export const Logo = withStyles(styles)(UnstyledLogo);
