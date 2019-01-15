import { createStyles, Grid, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { match } from 'react-router-dom';

import { ErrorMessage } from '../../Components/ErrorMessage';
import { LoginContainer } from '../../Containers/LoginContainer';
import { Logo } from '../../NavBar/Logo';
import { theme } from '../../theme';

const styles = createStyles({
  gridRoot: {
    color: theme.palette.primary.contrastText,
    flexGrow: 1,
    textAlign: 'center'
  },
  logo: {
    marginBottom: 10
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '100vh'
  }
});

export interface LoginPageProps extends WithStyles<typeof styles> {
  match?: match<{ userId: string }>;
  error?: boolean;
}

export const UnstyledLoginPage: React.SFC<LoginPageProps> = ({
  match: { params: { userId } } = { params: { userId: '' } },
  classes: { root, logo, gridRoot },
  error
}) => (
  <div className={root}>
    <Grid
      className={gridRoot}
      container
      direction='column'
      justify='center'
      alignItems='center'
    >
      <Grid className={logo} item xs={8}>
        <Logo />
      </Grid>
      <Grid item xs={8}>
        {error ? <ErrorMessage /> : <LoginContainer userId={userId} />}
      </Grid>
    </Grid>
  </div>
);

export const LoginPage = withStyles(styles)(UnstyledLoginPage);
