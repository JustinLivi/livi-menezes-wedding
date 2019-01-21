import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Profile } from '../common';
import { NavBar } from '../NavBar';
import { LoginPage } from '../Pages/Login';
import { SideBar } from '../SideBar';
import { getProfile } from '../store/selectors/user';
import { ProtectedRoutes } from './ProtectedRoutes';

export const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    minHeight: 400
  }
});

export interface ProtectedRouterStateProps {
  profile?: Profile;
}

export interface ProtectedRouterParentProps extends WithStyles<typeof styles> {}

export type ProtectedRouterProps = ProtectedRouterStateProps &
  ProtectedRouterParentProps;

export const UnstyledProtectedRouter: React.SFC<ProtectedRouterProps> = ({
  classes: { root },
  profile
}) =>
  profile ? (
    <React.Fragment>
      <SideBar />
      <div className={root}>
        <NavBar />
        <ProtectedRoutes />
      </div>
    </React.Fragment>
  ) : (
    <LoginPage error />
  );

export const UnconnectedProtectedRouter = withStyles(styles)(
  UnstyledProtectedRouter
);

export const mapStateToProps = createSelector(
  [getProfile],
  profile => ({
    profile
  })
);

export const ProtectedRouter = connect(mapStateToProps)(
  UnconnectedProtectedRouter
);
